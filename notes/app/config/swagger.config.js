module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "Notes microservice API",
    },
  },
  apis: ["./app/routes/*.js"],
};
