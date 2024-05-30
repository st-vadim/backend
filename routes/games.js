const gamesRouter = require("express").Router();

const {
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
} = require("../middlewares/games");

const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games");

const { checkAuth } = require("../middlewares/auth");

gamesRouter.get("/games", findAllGames, sendAllGames);

gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvailable,
  checkEmptyFields,
  checkAuth,
  createGame,
  sendGameCreated
);

gamesRouter.get("/games/:id", findGameById, sendGameById);

gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvailable,
  checkEmptyFields,
  checkAuth,
  updateGame,
  sendGameUpdated
);

gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted);

module.exports = gamesRouter;
