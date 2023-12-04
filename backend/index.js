const express = require("express");
const path = require("path");
const cors = require("cors");  
require("dotenv").config();

const app = express();
app.use(cors());  
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/users", require("./routes/UserAPI"));
app.use("/install", require("./routes/InstallAPI"));
app.use("/game", require("./routes/GameAPI"));

app.listen(3002, () => {
  console.log("Listening...");
});
