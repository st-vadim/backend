const sendAllGames = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.gamesArray));
};

// Function send a new game
const sendGameCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

// Function send game by id
const sendGameById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

// Function show result update game
const sendGameUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Update game" }));
};

// Function show result delete game
const sendGameDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

module.exports = {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
};
