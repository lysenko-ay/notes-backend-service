const db = require("../models/index.js");

const Note = db.note;

exports.getAll = async (req, res) => {
  try {
    let notes = await Note.findAll();
    res.json(notes);
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }
};

exports.getOne = async (req, res) => {
  try {
    let note = await Note.findOne({ where: { id: req.params.id } });
    if (note === null) {
      res.status(404).json({ error: "not found" });
      return;
    }

    res.json(note);
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }
};

exports.add = async (req, res) => {
  try {
    await Note.create({ userId: req.userId, text: req.body.text });
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.json({ message: "success" });
};

exports.update = async (req, res) => {
  try {
    let note = await Note.findOne({ where: { id: req.params.id } });
    if (note === null) {
      res.status(404).json({ error: "not found" });
      return;
    }

    if (note.userId != req.userId) {
      res.status(403).json({ error: "not an owner" });
      return;
    }

    note.text = req.body.text;
    await note.save();
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.json({ message: "success" });
};

exports.delete = async (req, res) => {
  try {
    let note = await Note.findOne({ where: { id: req.params.id } });
    if (note === null) {
      res.status(404).json({ error: "not found" });
      return;
    }

    if (note.userId != req.userId) {
      res.status(403).json({ error: "not an owner" });
      return;
    }

    await note.destroy();
  }
  catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.json({ message: "success" });
};
