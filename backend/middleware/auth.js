const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.token = jwt.verify(token, `Mon_token_secret`);
    const userId = req.token.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    const message = `Vous n'avez pas les droits pour effectuer cette action`
    res.status(401).json({ message })
  }
};