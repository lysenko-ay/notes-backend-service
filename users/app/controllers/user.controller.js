const db = require("../models/index.js");
const User = db.user;

exports.update = async (req, res) => {
  try {
    let user = await User.findOne({ where: { id: req.userId } });
    if (user === null) {
      res.status(404).json({ error: "not found" });
      return;
    }

    if (user.id != req.userId) {
      res.status(403).json({ error: "not an owner" });
      return;
    }

    user.email = req.body.email;
    await user.save();
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.json({ message: "success" });
};

exports.delete = async (req, res) => {
  try {
    let user = await User.findOne({ where: { id: req.userId } });
    if (user === null) {
      res.status(404).json({ error: "not found" });
      return;
    }

    if (user.id != req.userId) {
      res.status(403).json({ error: "not an owner" });
      return;
    }

    await user.destroy();
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.json({ message: "success" });
};
