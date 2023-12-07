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
      title: "League of Legends",
      short_description: "A cool and a Fun game",
      game_url: "https://example.com/game1",
      genre: "Action",
      platform: "PC",
      release_date: new Date("2022-01-01"),
      publisher: "Publisher 1",
      thumbnail: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-872a966297484acd0efe49f34edd5aed" 
    },
    
    {
      title: "GTA V",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://t.ctcdn.com.br/3DEs5RmSBHOMfVdyQGLSidyGj-Y=/291x28:1737x842/1446x813/smart/i328744.jpeg" 
    },
    {
      title: "Starcraft 2",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://bnetcmsus-a.akamaihd.net/cms/blog_header/2g/2G4VZH5TIWJF1602720144046.jpg" 
    },
    {
      title: "Minecraft",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://t.ctcdn.com.br/pLsPIbom8sGAhdbSIIF2FuUZ8eU=/640x360/smart/i575891.jpeg" 
    },
    {
      title: "The Forest",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://s2-techtudo.glbimg.com/OonmQP9Aiugeql29j_WV1kh4Vgk=/0x0:695x390/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/p/x/DiF3RxRY26q83Ea0hWmw/2014-08-04-the-forest-imagem-divulgacao1.jpg" 
    },
    {
      title: "Agario",
      short_description: "Description 2",
      game_url: "https://r.agar.io/?party=BYRL2C",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://static.miniclip.com/redirector/public/img/ogimage/agario.png" 
    },
    {
      title: "Valorant",
      short_description: "Description 2",
      game_url: "https://example.com/game2",
      genre: "Adventure",
      platform: "Console",
      release_date: new Date("2022-02-15"),
      publisher: "Publisher 2",
      thumbnail: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt4444ec49c9a9e717/653c18621680320407c39d31/Copy_of_Ep7a3_ISO_Content_Stack_Thumbnail_1200x625_.png" 
    },
    
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
