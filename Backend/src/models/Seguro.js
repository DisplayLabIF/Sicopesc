const { Model, DataTypes } = require("sequelize");

class Seguro extends Model {
    static init(sequelize) {
        super.init(
            {   // dados principais
                pescador_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                // Entidade responsável pelo seguro
                entidade_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                // 1 Dados do pescador
                apelido: DataTypes.STRING,
                local_nascimento: DataTypes.STRING,
                rg_data_expedicao: DataTypes.DATE,
                rg_local_expedicao: DataTypes.STRING,

                // Final do documento
                local_declaracao: DataTypes.STRING,
                data_declaracao: DataTypes.DATE,
                observacoes_gerais: DataTypes.TEXT,
            },
            {
                sequelize,
                tableName: "seguros",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Pescador, {
            foreignKey: "pescador_id",
            as: "pescador",
        });

        this.belongsTo(models.Entidade, {
            foreignKey: "entidade_id",
            as: "entidade",
        });

        this.hasMany(models.AtividadeSeguro, {
            foreignKey: "seguro_id",
            as: "atividades",
        });

        this.hasMany(models.GrupoFamiliarSeguro, {
            foreignKey: "seguro_id",
            as: "familiares",
        });

        this.hasMany(models.EmbarcacaoSeguro, {
            foreignKey: "seguro_id",
            as: "embarcacoes",
        });

        this.hasMany(models.OutraRendaSeguro, {
            foreignKey: "seguro_id",
            as: "rendas",
        });
    }
}

module.exports = Seguro;
