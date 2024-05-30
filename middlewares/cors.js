const allowedCors = [
  "https://practicum.yandex.ru",
  "https://students-projects.ru",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://frontend-23-sotov.nomorepartiesco.ru",
  "http://frontend-23-sotov.nomorepartiesco.ru",
  "https://backend-23-sotov.nomorepartiesco.ru",
  "http://backend-23-sotov.nomorepartiesco.ru",
];

const cors = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );

  next();
};

module.exports = cors;
