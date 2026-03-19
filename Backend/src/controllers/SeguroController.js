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
        routes.get("/:id", this.show.bind(this));
        routes.delete("/:id", this.destroy.bind(this));

        // Rotas para busca
        routes.get("/nome/:nome", this.findByNome.bind(this));
        routes.get("/cpf/:cpf", this.findByCPF.bind(this));
        routes.get("/rgp/:rgp", this.findByRGP.bind(this));

        return routes;
    }

    async index(req, res) {
        try {
            const { page = 1 } = req.query;
            const limit = 20;

            const { count, rows } = await Seguro.findAndCountAll({
                limit,
                offset: (page - 1) * limit,
                include: [{ association: 'pescador' }],
                order: [['created_at', 'DESC']]
            });

            return res.json({
                seguros: rows,
                itemCount: count,
                pageCount: Math.ceil(count / limit),
                currentPage: parseInt(page)
            });
        } catch (error) {
            console.error("Erro no index de seguros:", error);
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const seguro = await Seguro.findByPk(id, {
                include: ['atividades', 'embarcacoes', 'pescador', 'familiares', 'rendas']
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
    
    async destroy(req, res) {
        try {
            const { id } = req.params;

            const seguro = await Seguro.findByPk(id);

            if (!seguro) {
                return res.status(404).json({ error: "Seguro não encontrado" });
            }

            await seguro.destroy();

            return res.json({ message: "Seguro deletado com sucesso" });
        } catch (error) {
            console.error("Erro ao deletar seguro:", error);
            return res.status(500).json({ error: error.message });
        }
    }

    async findByNome(req, res) {
        try {
            const { nome } = req.params;
            const { page = 1 } = req.query;
            const limit = 20;
            const { Op } = require("sequelize");

            const { count, rows } = await Seguro.findAndCountAll({
                limit,
                offset: (page - 1) * limit,
                include: [{
                    association: 'pescador',
                    where: {
                        nome: { [Op.like]: `%${nome}%` }
                    }
                }],
                order: [['created_at', 'DESC']]
            });

            return res.json({
                seguros: rows,
                itemCount: count,
                pageCount: Math.ceil(count / limit),
                currentPage: parseInt(page)
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findByCPF(req, res) {
        try {
            const { cpf } = req.params;
            const { count, rows } = await Seguro.findAndCountAll({
                include: [{
                    association: 'pescador',
                    where: { cpf }
                }]
            });
            return res.json({ seguros: rows, itemCount: count });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findByRGP(req, res) {
        try {
            const { rgp } = req.params;
            const { count, rows } = await Seguro.findAndCountAll({
                include: [{
                    association: 'pescador',
                    where: { rgp }
                }]
            });
            return res.json({ seguros: rows, itemCount: count });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = (app) => new SeguroController(app);