const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

// Create and Save a new Todo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.td_title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const td_published = req.body.td_published ? req.body.td_published : false;
  const { td_title, td_description } = req.body;

  // Create a Todo
  const todo = {
    td_title,
    td_description,
    td_published,
  };

  // Save Todo in the database
  Todo.create(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Todo.",
      });
    });
};

// Retrieve all Todos from the database.
exports.findAll = (req, res) => {
  const td_title = req.query.td_title;

  const condition = td_title
    ? { td_title: { [Op.like]: `%${td_title}%` } }
    : null;

  Todo.findAll({
    where: condition,
    order: [["td_id", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

// Find a single Todo with an id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Todo.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id,
      });
    });
};

// Update a Todo by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;

  Todo.update(req.body, {
    where: { td_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id,
      });
    });
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  Todo.destroy({
    where: { td_id: id },
    force: true,
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id,
      });
    });
};

// Delete all Todos from the database.
exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Todos were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all todos.",
      });
    });
};
