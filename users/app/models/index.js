const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.hostname,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    }
  }
);

const db = {
  Sequelize,
  sequelize,

  user: require("../models/user.model.js")(sequelize, Sequelize)
};

module.exports = db;
