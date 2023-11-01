const http = require("http");
const mysql = require('mysql2')
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`WELCOME-50-2st-Bteam-SERVER! ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
