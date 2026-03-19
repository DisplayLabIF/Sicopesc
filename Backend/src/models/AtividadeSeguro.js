const { Model, DataTypes } = require("sequelize");

class AtividadeSeguro extends Model {
    static init(connection) {
        super.init(
            {
                // 2. Periodo de atividade de pesca
                data_inicio: DataTypes.DATE,
                data_fim: DataTypes.DATE,

                local: DataTypes.ENUM(
                    "MAR",
                    "RIO",
                    "ESTUARIO",
                    "LAGOA",
                    "ACUDE",
                    "REPRESA"
                ),
                situacao: DataTypes.ENUM("INDIVIDUAL", "ECONOMIA_FAMILIAR"),
                condicao_grupo_familiar: DataTypes.ENUM("TITULAR", "COMPONENTE"),
                observacoes: DataTypes.TEXT,
                
            },
            {
                sequelize: connection,
                tableName: "atividades_seguro",
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

module.exports = AtividadeSeguro;
