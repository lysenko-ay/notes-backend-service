module.exports = {
  hostname: "localhost",
  username: "postgres",
  password: "1",
  database: "users",

  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
