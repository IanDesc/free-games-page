const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { success, fail } = require("../helpers/resposta");
const userController = require("../controllers/userController");
require("dotenv").config();
const bcrypt = require('bcrypt');


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userController.getByEmail(email);

    if (user) {
      
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
      
        const token = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        res.json(success({ token }));
      } else {
        res.status(401).json(fail("Credenciais inválidas"));
      }
    } else {
      res.status(401).json(fail("Credenciais inválidas"));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(fail("Erro no processo de login"));
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userController.list();
    res.json(success(users, "Listando todos os usuários"));
  } catch (error) {
    console.error(error);
    res.status(500).json(fail("Erro ao listar usuários"));
  }
});

module.exports = router;
