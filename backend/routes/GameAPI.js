const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const { success, fail } = require("../helpers/resposta");
const { authenticateToken } = require("../auth/gameAuth");

router.post("/", authenticateToken, async (req, res) => {
  const { title, short_description, game_url, genre, platform, release_date, publisher } = req.body;

  try {
    const newGame = await gameController.save(title, short_description, game_url, genre, platform, release_date, publisher);
    res.json(success(newGame, "Jogo criado com sucesso"));
  } catch (error) {
    console.error(error);
    res.status(500).json(fail("Erro ao criar jogo"));
  }
});

router.get("/", async (req, res) => {
  try {
    const games = await gameController.list();
    res.json(success(games, "Listando todos os jogos"));
  } catch (error) {
    console.error(error);
    res.status(500).json(fail("Erro ao listar jogos"));
  }
});

router.get("/search", async (req, res) => {
  const { substring } = req.query;

  try {
    const games = await gameController.searchBySubstring(substring);
    res.json(success(games, "Resultados da pesquisa por substring"));
  } catch (error) {
    console.error(error);
    res.status(500).json(fail("Erro na pesquisa por substring"));
  }
});

module.exports = router;
