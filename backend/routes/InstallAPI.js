const express = require("express");
const router = express.Router();
const sequelize = require("../helpers/bd");
const userController = require('../controllers/userController');
const gameController = require('../controllers/gameController');

router.get('/', async (req, res) => {
  await sequelize.sync({ force: true });

  let users = [
    { email: "admin@admin.com", password: "admin", isAdmin: true },
    { email: "kaina@hotmail.com", password: "kaka", isAdmin: false }
  ];

  let games = [
    {
      title: "Game 1",
      short_description: "Description 1",
      game_url: "https://example.com/game1",
      genre: "Action",
      platform: "PC",
      release_date: new Date("2022-01-01"),
      publisher: "Publisher 1"
    },
    {
      title: "Game 2",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2"
    }
  ];

  try {
    let createdUsers = [];
    for (let i = 0; i < users.length; i++) {
      let { email, password, isAdmin } = users[i];
      let createdUser = await userController.save(email, password, isAdmin);
      createdUsers.push(createdUser);
    }

    let createdGames = [];
    for (let i = 0; i < games.length; i++) {
      let {
        title,
        short_description,
        game_url,
        genre,
        platform,
        release_date,
        publisher
      } = games[i];
      let createdGame = await gameController.save(
        title,
        short_description,
        game_url,
        genre,
        platform,
        release_date,
        publisher
      );
      createdGames.push(createdGame);
    }

    res.json({
      users: createdUsers,
      games: createdGames
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o install" });
  }
});

module.exports = router;
