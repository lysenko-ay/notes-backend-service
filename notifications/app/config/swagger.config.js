module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notifications API",
      version: "1.0.0",
      description: "Notifications microservice API",
    },
  },
  apis: ["./app/routes/*.js"],
};
