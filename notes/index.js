const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const db = require("./app/models/index.js");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const specs = swaggerJsDoc(require("./app/config/swagger.config.js"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

db.sequelize.sync({ force: true }).then(() => {
  console.log("resyncing db...");

  app.get("/", (req, res) => {
    res.send("notes app is working");
  });

  require('./app/routes/notes.routes.js')(app);

  app.listen(8081, () => {
    console.log(`server is running at http://localhost:${8081}.`);
  });

}).catch(error => {
  console.log(error)
});
