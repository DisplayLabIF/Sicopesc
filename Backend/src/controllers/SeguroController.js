const { Seguro, AtividadeSeguro, EmbarcacaoSeguro, Pescador } = require("../models");
const express = require("express");
const authMiddleware = require("../middlewares/auth");

class SeguroController {
    constructor(app) {
        app.use("/seguros", this.createRoutes());
    }

    createRoutes() {
        const routes = express.Router();
        routes.use(authMiddleware);

        routes.post("/", this.store.bind(this));
        routes.get("/", this.index.bind(this));
        routes.get("/:id", this.show.bind(this)); // Agora o método show existe abaixo

        return routes;
    }

    async index(req, res) {
        try {
            const seguros = await Seguro.findAll({ include: [{ association: 'pescador' }] });
            return res.json(seguros);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const seguro = await Seguro.findByPk(id, {
                include: ['atividades', 'embarcacoes', 'pescador']
            });

            if (!seguro) return res.status(404).json({ error: "Seguro não encontrado" });

            return res.json(seguro);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async store(req, res) {
        try {
            console.log("Dados recebidos do Front:", JSON.stringify(req.body, null, 2));
            
            const seguro = await Seguro.create(req.body, {
                include: [
                    { association: 'atividades' },
                    { association: 'embarcacoes' },
                    { association: 'familiares' },
                    { association: 'rendas' }
                ]
            });
            
            return res.status(201).json(seguro);
        } catch (error) {
            // Captura erros de validação (Campos obrigatórios ou Enums errados)
            if (error.name === 'SequelizeValidationError') {
                const mensagens = error.errors.map(err => ({
                    campo: err.path,
                    mensagem: err.message,
                    valor_enviado: err.value
                }));
                
                console.error("ERRO DE VALIDAÇÃO:", mensagens);
                return res.status(400).json({ 
                    error: "Dados inválidos", 
                    detalhes: mensagens 
                });
            }

            // Captura erros de Banco de Dados (ex: pescador_id inexistente)
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ 
                    error: "Erro de relacionamento", 
                    detalhe: "O Pescador ou Entidade informada não existe no sistema." 
                });
            }

            console.error("ERRO DESCONHECIDO:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = (app) => new SeguroController(app);