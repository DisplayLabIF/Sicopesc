'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('outras_rendas_seguro', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      seguro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'seguros', key: 'id' },
        onDelete: 'CASCADE'
      },

      // 4. Outras atividades / Rendas
      atividade: Sequelize.STRING,
      local: Sequelize.STRING,
      data_inicio_renda: Sequelize.DATE,
      data_fim_renda: Sequelize.DATE,
      renda: Sequelize.STRING,

      // 4.1 Recebeu outra renda
      recebeu_outrarenda: Sequelize.BOOLEAN,
      atividade_outrarenda: Sequelize.STRING,
      data_inicio_outrarenda: Sequelize.DATE,
      data_fim_outrarenda: Sequelize.DATE,
      renda_outrarenda: Sequelize.DECIMAL(10, 2),
      observacao_outrarenda: Sequelize.TEXT,

      // 4.2 Participa de cooperativa
      participa_cooperativa: Sequelize.BOOLEAN,
      nome_cooperativa: Sequelize.STRING,
      cnpj_cooperativa: Sequelize.STRING(14),
      tipo_cooperativa: Sequelize.ENUM('AGROPECUARIA', 'CREDITO_RURAL'),

      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('outras_rendas_seguro');
  }
};
