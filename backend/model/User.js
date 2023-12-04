const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');
const { body } = require('express-validator');

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

UserModel.addHook('beforeValidate', (user) => {
  user.email = body('email').trim().escape().normalizeEmail().run(user.email);
});

module.exports = UserModel;
