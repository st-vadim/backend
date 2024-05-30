const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  if (req.query["categories.name"]) {
    req.gamesArray = await games.findGameByCategory(
      req.query["categories.name"]
    );
    next();
    return;
  }
  const result = await games.find({}).populate("categories").populate({
    path: "users",
    select: "-password",
  });
  req.gamesArray = result;
  console.log(result);
  next();
};

// Create new game
const createGame = async (req, res, next) => {
  console.log("POST /games");
  try {
    console.log(req.body);
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .statusCode(400)
      .send(JSON.stringify({ message: "Error create new game" }));
  }
};

// Search game by id
const findGameById = async (req, res, next) => {
  try {
    req.game = await games
      .findById(req.params.id)
      .populate("categories")
      .populate({
        path: "users",
        select: "-password",
      });
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode(404).send(JSON.stringify({ message: "Game not found" }));
  }
};

// Update game data
const updateGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode(400).send(JSON.stringify({ message: "Error update game" }));
  }
};

// Delete game by id
const deleteGame = async (req, res, next) => {
  try {
    res.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode(400).send(JSON.stringify({ message: "Error delete game" }));
  }
};

// Check all inputs
const checkEmptyFields = async (req, res, next) => {
  if (req.isVoteRequest) {
    next();
    return;
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode(400).send(JSON.stringify({ message: "Fill in all inputs" }));
  } else {
    next();
  }
};

// Check categories by id
const checkIfCategoriesAvailable = async (req, res, next) => {
  if (req.isVoteRequest) {
    next();
    return;
  }
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Please, at least one category" }));
  } else {
    next();
  }
};

// Check, if user in array
const checkIfUsersAreSafe = async (req, res, next) => {
  if (!req.body.users) {
    next();
    return;
  }
  if (Math.abs(req.body.users.length - req.game.users.length) === 1) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "You cannot delete users or add more than one user",
      })
    );
  }
};

// Check new game and check update game for duplicates
const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({ message: "A game with that name already exists" })
      );
  } else {
    next();
  }
};

const checkIsVoteRequest = async (req, res, next) => {
  if (Object.keys(req.body).length === 1 && req.body.users) {
    req.isVoteRequest = true;
  }
  next();
};

module.exports = {
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfCategoriesAvailable,
  checkIfUsersAreSafe,
  checkIsGameExists,
  checkIsVoteRequest,
};
