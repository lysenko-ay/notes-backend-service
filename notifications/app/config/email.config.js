
module.exports = {
  transport: {
    service: "gmail",
    auth: {
      user: "enter-your-username",
      pass: "enter-your-password",
    },
  },

  message: {
    subject: (username) => `Welcome to notes server, ${username}!`,
    text: (username) => `${username}, welcome to notes server!`,
  }
};
