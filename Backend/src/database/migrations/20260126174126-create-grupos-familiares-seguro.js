'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('grupos_familiares_seguro', {
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

      // 2.1 Condição no grupo familiar
      condicao: {
        type: Sequelize.ENUM('TITULAR', 'COMPONENTE')
      },
      
      // 2.2 Grupo familiar
      nome: Sequelize.STRING,
      cpf: Sequelize.STRING(14),
      nascimento: Sequelize.DATE,
      estado_civil: {
        type: Sequelize.ENUM('SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIUVO')
      },
      parentesco: Sequelize.STRING,

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
    await queryInterface.dropTable('grupos_familiares_seguro');
  }
};
