'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('enderecos', { 
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          logradouro: {
            type: Sequelize.STRING,
          },
          numero: {
            type: Sequelize.STRING,
          },
          bairro: {
            type: Sequelize.STRING,
          },
          cidade: {
            type: Sequelize.STRING,
          },
          estado: {
            type: Sequelize.STRING,
          },
          cep: {
            type: Sequelize.STRING,
          },
          pescador_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'pescadors', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
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

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('enderecos');
  }
};
