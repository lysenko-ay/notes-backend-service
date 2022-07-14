const db = require("../models/index.js");
const User = db.user;

verifyLoginAndEmail = async (req, res, next) => {
  let user;

  try {
    user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      res.status(400).json({ error: "email already in use" });
      return;
    }
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }

  try {
    user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      res.status(400).json({ error: "username already in use" });
      return;
    }
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }

  next();
};

module.exports = verifyLoginAndEmail;
