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
      publisher: "Publisher 1",
      thumbnail: "https://picsum.photos/600/300" // Placeholder image from Lorem Picsum
    },
    {
      title: "Game 2",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://picsum.photos/600/300" // Placeholder image from Lorem Picsum
    },
    {
      title: "Game 3",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://picsum.photos/600/300" // Placeholder image from Lorem Picsum
    },
    {
      title: "Game 4",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://picsum.photos/600/300" // Placeholder image from Lorem Picsum
    },
    {
      title: "Game 345345",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://picsum.photos/600/300" // Placeholder image from Lorem Picsum
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
        publisher,
        thumbnail
      } = games[i];
      let createdGame = await gameController.save(
        title,
        short_description,
        game_url,
        genre,
        platform,
        release_date,
        publisher,
        thumbnail
      );
      createdGames.push(createdGame);
    }

    res.status(200).json({
      message: "Instalação concluída com sucesso",
      users: createdUsers,
      games: createdGames
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a instalação" });
  }
});

module.exports = router;
