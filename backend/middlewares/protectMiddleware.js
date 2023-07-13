const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const protect = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(403).send(error.message);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(403).send("Not authorized.");
  }
};

module.exports = { protect };
