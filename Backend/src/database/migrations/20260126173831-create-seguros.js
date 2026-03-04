'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('seguros', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      pescador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'pescadors', key: 'id' },
        onDelete: 'CASCADE'
      },

      entidade_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'entidades', key: 'id' },
        onDelete: 'CASCADE'
      },

      // 1 Dados do pescador
      apelido: Sequelize.STRING,
      local_nascimento: Sequelize.STRING,

      rg_data_expedicao: Sequelize.DATE,
      rg_local_expedicao: Sequelize.STRING,

      // final do documento
      local_declaracao: {
        type: Sequelize.STRING,
        allowNull: true
      },

      data_declaracao: Sequelize.DATE,

      observacoes_gerais: Sequelize.TEXT,

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('seguros');
  }
};
