const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: 'O campo de e-mail deve ser um endereço de e-mail válido.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = UserModel;
