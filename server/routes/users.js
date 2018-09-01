const express = require("express");
const db = require("../database/index.js");

let router = express.Router();

router.get("/users:username", (req, res) => {
  db.getUser(req.params.username.slice(1)).then(user => {
    res.json(user);
  });
});

module.exports = router;
