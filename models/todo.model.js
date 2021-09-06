module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    td_id: {
      type: Sequelize.INTEGER,
      field: "td_id",
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    td_title: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
    td_description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return Todo;
};
