module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define("note", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Note;
};
