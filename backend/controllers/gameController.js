const { Sequelize, Op } = require('sequelize');
const GameModel = require('../model/Game');


const gameController = {
  list: async function() {
    const games = await GameModel.findAll();
    return games;
  },

  save: async function(title, short_description, game_url, genre, platform, release_date, publisher, thumbnail) {
    const game = await GameModel.create({
      title: title,
      short_description: short_description,
      game_url: game_url,
      genre: genre,
      platform: platform,
      release_date: release_date,
      publisher: publisher,
      thumbnail: thumbnail, 
    });
    return game;
  },

  update: async function(id, title, short_description, game_url, genre, platform, release_date, publisher, thumbnail) {
    const game = await GameModel.findByPk(id);
    if (!game) {
      return false;
    }

    await game.update({
      title: title,
      short_description: short_description,
      game_url: game_url,
      genre: genre,
      platform: platform,
      release_date: release_date,
      publisher: publisher,
      thumbnail: thumbnail, 
    });

    return game;
  },

  delete: async function(id) {
    return await GameModel.destroy({ where: { id: id } });
  },

  getById: async function(id) {
    return await GameModel.findByPk(id);
  },

  getByTitle: async function(title) {
    return await GameModel.findOne({ where: { title: title } });
  },

  searchBySubstring: async function(substring) {
    const games = await GameModel.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${substring}%`
            }
          },
          {
            genre: {
              [Op.like]: `%${substring}%`
            }
          },
          {
            platform: {
              [Op.like]: `%${substring}%`
            }
          }
        ]
      }
    });

    return games;
  }
};

module.exports = gameController;
