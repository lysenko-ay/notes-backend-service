
exports.public = async (req, res) => {
  res.send("public area");
};

exports.user = async (req, res) => {
  res.send("user area");
};
