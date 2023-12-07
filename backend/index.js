const express = require("express");
const path = require("path");
const cors = require("cors");
const { xss } = require('express-xss-sanitizer');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(xss());  // Add this line
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = require("./helpers/bd");
const LogModel = require("./model/LogModel");

sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
  });

app.use("/users", require("./routes/UserAPI"));
app.use("/install", require("./routes/InstallAPI"));
app.use("/game", require("./routes/GameAPI"));

app.listen(3002, () => {
  console.log("Listening...");
});
