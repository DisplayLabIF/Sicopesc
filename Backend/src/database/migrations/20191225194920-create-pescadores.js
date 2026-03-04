"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("pescadors", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: true,
      },
      rg: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      nascimento: {
        type: Sequelize.DATE,
      },
      rgp: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      data_de_emissao_rgp: {
        type: Sequelize.DATE,
      },
      data_do_primeiro_rgp: {
        type: Sequelize.DATE,
      },
      titulo: {
        type: Sequelize.STRING(20),
      },
      data_de_filiacao: {
        type: Sequelize.DATE,
      },
      nit: {
        type: Sequelize.STRING(11),
      },
      cei: {
        type: Sequelize.STRING(12),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("pescadors");
  },
};
