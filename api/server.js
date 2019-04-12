const express = require("express");
const Games = require("./gamesModal");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

server.get("/games", async (req, res) => {
  try {
    const games = await Games.getAll();

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/games", async (req, res) => {
  try {
    const { title, genre } = req.body;

    if (!title || !genre) {
      res.status(400).json({ err: "Provide the necessary fields" });
    }

    const games = await Games.insert(req.body);

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
