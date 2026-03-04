const { Model, DataTypes } = require("sequelize");

class EmbarcacaoSeguro extends Model {
    static init(connection) {
        super.init(
            {
                // 3. Codição em relação a embarcação
                data_inicio: DataTypes.DATE,
                data_fim: DataTypes.DATE,
                condicao: DataTypes.ENUM(
                    "PROPRIETARIO",
                    "ARRENDATARIO",
                    "COMODATARIO",
                    "MEEIRO",
                    "PARCEIRO",
                    "SEM_EMBARCACAO"
                ),
                arqueacao_bruta: DataTypes.DECIMAL(10, 2),
                observacao_condicao: DataTypes.TEXT,

                // 3.1 ArendamentoProprietário
                data_inicio_proprietario: DataTypes.DATE,
                data_fim_proprietario: DataTypes.DATE,

                // 3.2 Nome e CPF do titular da embarcação
                nome_titular: DataTypes.STRING,
                cpf_titular: DataTypes.STRING(14),
                data_inicio_titular: DataTypes.DATE,
                data_fim_titular: DataTypes.DATE,
                observacao_titular: DataTypes.TEXT,

                // 3.3 Atividade pesqueira
                atividade: DataTypes.STRING,
                subsistencia: DataTypes.ENUM("SUBSISTENCIA", "VENDA"),
                
                // 3.4 Recolhimento de IPI
                recolhimento_ipi: DataTypes.BOOLEAN,
                data_inicio_ipi: DataTypes.DATE,
                data_fim_ipi: DataTypes.DATE,

                // 3.5 Dados da embarcação
                possui_empregados: DataTypes.BOOLEAN,
                nome_empregados: DataTypes.TEXT,
                cpf_empregados: DataTypes.STRING(14),
                data_inicio_empregados: DataTypes.DATE,
                data_fim_empregados: DataTypes.DATE,
            },
            {
                sequelize: connection,
                tableName: "embarcacoes_seguro",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Seguro, {
            foreignKey: "seguro_id",
            as: "seguro",
        });
    }
}

module.exports = EmbarcacaoSeguro;
