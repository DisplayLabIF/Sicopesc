const { Model, DataTypes } = require('sequelize');

class Endereco extends Model{
    static init(connection){
        super.init({
            logradouro: DataTypes.STRING,
            numero: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            estado: DataTypes.STRING,
            cep: DataTypes.STRING,
        },{
            sequelize: connection,
        })
    }
    static associate(models){
        this.belongsTo(models.Pescador, { foreignKey: 'pescador_id', as: 'pescador'});
    }
}

module.exports = Endereco;