const verifyToken = require("./jwt.middleware.js")
const signUp = require("./signUp.middleware.js")

module.exports = { verifyToken, signUp };
