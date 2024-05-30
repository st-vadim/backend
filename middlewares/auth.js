const jwt = require("jsonwebtoken");
const users = require("../models/user");

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith("Bearer ")) {
  //   return res.status(401).send("Please log in");
  // }

  const token = authorization.replace("Bearer ", "");

  try {
    const jwtData = jwt.verify(token, "some-secret-key");
    req.user = await users.findById(jwtData._id, { password: 0 });
  } catch (error) {
    return res.status(401).send("Please log in");
  }
  next();
};

const checkCookiesJWT = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.redirect("/");
  }
  req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  next();
};

module.exports = { checkAuth, checkCookiesJWT };
