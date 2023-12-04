const jwt = require('jsonwebtoken');
const { success, fail } = require("../helpers/resposta");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json(fail("Acesso negado"));

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).json(fail("Token inválido"));
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };