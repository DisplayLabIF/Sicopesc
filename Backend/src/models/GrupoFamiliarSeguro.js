const { Model, DataTypes } = require("sequelize");

class GrupoFamiliarSeguro extends Model {
    static init(connection) {
        super.init(
            {
                // 2.1 Condição no grupo familiar
                condicao: DataTypes.ENUM("TITULAR", "COMPONENTE"),

                // 2.2 Grupo familiar
                nome: DataTypes.STRING,
                cpf: DataTypes.STRING(14),
                nascimento: DataTypes.DATE,
                estado_civil: DataTypes.ENUM(
                    "SOLTEIRO",
                    "CASADO",
                    "DIVORCIADO",
                    "VIUVO"
                ),
                parentesco: DataTypes.STRING,
            },
            {
                sequelize: connection,
                tableName: "grupos_familiares_seguro",
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

module.exports = GrupoFamiliarSeguro;
