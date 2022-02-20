const jwt = require("jsonwebtoken");
const { User } = require("../db/sequelize");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      const decodedToken = jwt.verify(token, `Mon_token_secret`);
      const userId = decodedToken.id;
      if (userId) {
        User.findOne({ where: { id: userId } })
          .then((user) => {
            const userData = {
              email: user.email,
              firstName: user.firstName,
              name: user.name,
              email: user.email,
              description: user.description,
              token
            };
            res.locals.user = userData;
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
