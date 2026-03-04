const { Model, DataTypes } = require("sequelize");

class OutraRendaSeguro extends Model {
    static init(connection) {
        super.init(
            {
                // 4. Outras atividades / Rendas
                atividade: DataTypes.STRING,
                local: DataTypes.STRING,
                data_inicio_renda: DataTypes.DATE,
                data_fim_renda: DataTypes.DATE,
                renda: DataTypes.STRING,

                // 4.1 Recebeu outra renda
                recebeu_outrarenda: DataTypes.BOOLEAN,
                atividade_outrarenda: DataTypes.STRING,
                data_inicio_outrarenda: DataTypes.DATE,
                data_fim_outrarenda: DataTypes.DATE,
                renda_outrarenda: DataTypes.DECIMAL(10, 2),
                observacao_outrarenda: DataTypes.TEXT,

                // 4.2 Participa de cooperativa
                participa_cooperativa: DataTypes.BOOLEAN,
                nome_cooperativa: DataTypes.STRING,
                cnpj_cooperativa: DataTypes.STRING(14),
                tipo_cooperativa: DataTypes.ENUM("AGROPECUARIA", "CREDITO_RURAL")
            },
            {
                sequelize: connection,
                tableName: "outras_rendas_seguro",
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

module.exports = OutraRendaSeguro;
