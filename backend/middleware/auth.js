const jwt = require("jsonwebtoken");
const { User } = require("../db/sequelize");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      const userId = decodedToken.id;
      if (userId) {
        User.findOne({ where: { id: userId } })
          .then((user) => {
            res.locals.user = user;
          })
          .catch((err) => {
            const message = `Utilisateur introuvable`;
            res.status(400).json({ message, err });
          });
          next()
      }
    } else {
      response.locals.user = null;
      throw "error";
    }
  } catch (err) {
    const message = "autentification impossible";
    res.status(401).json({ message, error: err });
  }
};
