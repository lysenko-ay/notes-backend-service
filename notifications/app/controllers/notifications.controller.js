const { message } = require("../config/email.config.js");
const kafka = require("../kafka/index.js");

exports.add = async (req, res) => {
  if (("email" in req.body) === false) {
    res.status(400).json({ error: "missing email" });
    return;
  }

  if (("username" in req.body) === false) {
    res.status(400).json({ error: "missing username" });
    return;
  }

  let content = {
    subject: message.subject(req.body.username),
    text: message.text(req.body.username),
    email: req.body.email,
  }

  let success = await kafka.send(JSON.stringify(content));
  if (success) {
    res.json({ message: "success" });
  } else {
    res.status(500).json({ error: "" });
  }
};
