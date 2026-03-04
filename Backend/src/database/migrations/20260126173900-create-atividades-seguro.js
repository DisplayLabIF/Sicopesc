'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('atividades_seguro', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      seguro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'seguros', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      // 2. Periodo de atividade de pesca
      data_inicio: Sequelize.DATE,
      data_fim: Sequelize.DATE,

      local: {
        type: Sequelize.ENUM(
          'MAR',
          'RIO',
          'ESTUARIO',
          'LAGOA',
          'ACUDE',
          'REPRESA'
        )
      },
      situacao: {
        type: Sequelize.ENUM('INDIVIDUAL', 'ECONOMIA_FAMILIAR')
      },
      observacoes: Sequelize.TEXT,
      
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
    await queryInterface.dropTable('atividades_seguro');
  }
};
