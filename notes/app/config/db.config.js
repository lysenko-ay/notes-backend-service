module.exports = {
  hostname: "localhost",
  username: "postgres",
  password: "1",
  database: "notes",

  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
