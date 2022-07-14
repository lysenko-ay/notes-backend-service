const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const kafka = require("./app/kafka/index.js");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const specs = swaggerJsDoc(require("./app/config/swagger.config.js"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get("/", (req, res) => {
  res.send("notifications app is working");
});

require('./app/routes/notifications.routes.js')(app);

kafka.start().then(() => {
  app.listen(8082, () => {
    console.log(`server is running at http://localhost:${8082}.`);
  });
})
