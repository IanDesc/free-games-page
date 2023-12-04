const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');

const GameModel = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  short_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  game_url: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = GameModel;
