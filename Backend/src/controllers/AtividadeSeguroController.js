const { Seguro, AtividadeSeguro } = require("../models");
const express = require("express");
const authMiddleware = require("../middlewares/auth");

class AtividadeSeguroController {
    constructor(app) {
        app.use("/seguros", this.createRoutes());
    }

    createRoutes() {
        const routes = express.Router();

        routes.use(authMiddleware);

        routes.get("/:seguro_id/atividades", this.index.bind(this));
        routes.post("/:seguro_id/atividades", this.store.bind(this));
        routes.put("/:seguro_id/atividades/:id", this.update.bind(this));
        routes.delete("/:seguro_id/atividades/:id", this.delete.bind(this));

        return routes;
    }
    /**
     * LISTAR atividades de um seguro
     * GET /seguros/:seguro_id/atividades
    */
    async index(req, res) {
        const { seguro_id } = req.params;
    try {
        const seguro = await Seguro.findByPk(seguro_id);

        if (!seguro) {
            return res.status(404).json({ error: "Seguro não encontrado" });
        }

        const atividades = await AtividadeSeguro.findAll({
            where: { seguro_id },
            order: [["data_inicio", "ASC"]],
        });

        return res.json(atividades);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  }

  /**
   * CRIAR atividade (sempre vinculada ao seguro)
   * POST /seguros/:seguro_id/atividades
   */
    async store(req, res) {
        const { seguro_id } = req.params;

    try {
        const seguro = await Seguro.findByPk(seguro_id);

        if (!seguro) {
            return res.status(404).json({ error: "Seguro não encontrado" });
        }

        const atividade = await AtividadeSeguro.create({
        seguro_id,
        ...req.body,
        });

        return res.status(201).json(atividade);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  }

  /**
   * ATUALIZAR atividade
   * PUT /seguros/:seguro_id/atividades/:id
   */
     async update(req, res) {
        const { seguro_id, id } = req.params;

    try {
        const atividade = await AtividadeSeguro.findOne({
            where: { id, seguro_id },
        });

        if (!atividade) {
            return res.status(404).json({ error: "Atividade não encontrada" });
        }

        await atividade.update(req.body);

        return res.json(atividade);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  }

  /**
   * REMOVER atividade
   * DELETE /seguros/:seguro_id/atividades/:id
   */
    async delete(req, res) {
        const { seguro_id, id } = req.params;

    try {
        const atividade = await AtividadeSeguro.findOne({
            where: { id, seguro_id },
        });

        if (!atividade) {
            return res.status(404).json({ error: "Atividade não encontrada" });
        }

        await atividade.destroy();

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = (app) => new AtividadeSeguroController(app);
