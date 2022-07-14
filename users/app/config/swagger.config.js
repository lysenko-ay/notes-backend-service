module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "Users microservice API",
    },
  },
  apis: ["./app/routes/*.js"],
};
