'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('embarcacoes_seguro', {
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

      // 3. Condição em relação a embarcação
      data_inicio: Sequelize.DATE,
      data_fim: Sequelize.DATE,
      condicao: {
        type: Sequelize.ENUM(
          'PROPRIETARIO',
          'ARRENDATARIO',
          'COMODATARIO',
          'MEEIRO',
          'PARCEIRO',
          'SEM_EMBARCACAO'
        )
      },
      arqueacao_bruta: Sequelize.DECIMAL(10, 2),
      observacao_condicao: Sequelize.TEXT,

      // 3.1 ArendamentoProprietário
      data_inicio_proprietario: Sequelize.DATE,
      data_fim_proprietario: Sequelize.DATE,

      // 3.2 Nome e CPF do titular da embarcação
      nome_titular: Sequelize.STRING,
      cpf_titular: Sequelize.STRING(14),
      data_inicio_titular: Sequelize.DATE,
      data_fim_titular: Sequelize.DATE,
      observacao_titular: Sequelize.TEXT,

      // 3.3 Atividade pesqueira
      atividade: Sequelize.STRING,
      subsistencia: {
        type: Sequelize.ENUM('SUBSISTENCIA', 'VENDA')
      },

      // 3.4 Recolhimento de IPI
      recolhimento_ipi: Sequelize.BOOLEAN,
      data_inicio_ipi: Sequelize.DATE,
      data_fim_ipi: Sequelize.DATE,

      // 3.5 Dados da embarcação
      possui_empregados: Sequelize.BOOLEAN,
      nome_empregados: Sequelize.TEXT,
      cpf_empregados: Sequelize.STRING(14),
      data_inicio_empregados: Sequelize.DATE,
      data_fim_empregados: Sequelize.DATE,

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
    await queryInterface.dropTable('embarcacoes_seguro');
  }
};
