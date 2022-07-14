const db = require("../models/index.js");
const authConfig = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { post } = require("../utils/requests.utils.js")
const notificationsConfig = require("../config/notifications.config.js")

const User = db.user;

exports.signup = async (req, res) => {
  try {
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8)
    });
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }

  // try {
  //   let { host, port, path } = notificationsConfig;
  //   post(host, port, path, { email: req.body.email, username: req.body.username });
  // }
  // catch (error) {
  //   console.log("failed to send email notification");
  // }

  res.json({ message: "success" });
};

exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      res.status(404).send({ error: "username not found" });
      return;
    }

    if (bcrypt.compareSync(req.body.password, user.password) === false) {
      res.status(401).send({ error: "invalid password" });
      return;
    }

    let token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 3600 * 24
    });

    res.json({ message: "success", accessToken: token });
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }
};
