const { Model, DataTypes, Op } = require("sequelize");

class Pescador extends Model {
  static init(connection) {
    super.init(
      {
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING(11),
        rg: DataTypes.STRING(10),
        nascimento: DataTypes.DATE,
        rgp: DataTypes.STRING(20),
        data_de_emissao_rgp: DataTypes.DATE,
        data_do_primeiro_rgp: DataTypes.DATE,
        data_de_filiacao: DataTypes.DATE,
        titulo: DataTypes.STRING(20),
        nit: DataTypes.STRING(11),
        cei: DataTypes.STRING(12),
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Endereco, {
      foreignKey: "pescador_id",
      as: "enderecos",
    });
    this.hasMany(models.Guias, {
      foreignKey: "pescador_id",
      as: "guias",
    });
    this.belongsTo(models.Entidade, {
      foreignKey: "entidade_id",
      as: "entidade",
    });
    this.hasMany(models.Seguro, {
      foreignKey: "pescador_id",
      as: "seguros",
    });
  }
  static async getLastBirthdays(entidade_id) {
    let pescadores = null;

    if (process.env.NODE_ENV !== "test") {
      pescadores = await this.findAll({
        where: [
          {
            entidade_id,
          },
          this.sequelize.Sequelize.where(
            this.sequelize.fn("MONTH", this.sequelize.col("nascimento")),
            new Date().getMonth() + 1
          ),
          this.sequelize.Sequelize.where(
            this.sequelize.fn("DAY", this.sequelize.col("nascimento")),
            { [Op.gte]: new Date().getDate() }
          ),
        ],
        order: [
          this.sequelize.fn("month", this.sequelize.col("nascimento")),
          this.sequelize.fn("day", this.sequelize.col("nascimento")),
        ],
        limit: 5,
      });
    } else {
      pescadores = await this.findAll({
        where: {
          entidade_id,
        },
        order: [["nome", "ASC"]],
        limit: 5,
      });
    }

    return pescadores;
  }
}

module.exports = Pescador;
