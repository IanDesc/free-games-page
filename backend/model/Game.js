const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');
const { body } = require('express-validator');

const GameModel = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('title', sanitizeString(value));
    },
  },
  short_description: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('short_description', sanitizeString(value));
    },
  },
  game_url: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('game_url', sanitizeString(value));
    },
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

function sanitizeString(value) {
  
  return value.trim();
}

module.exports = GameModel;
