const express = require("express");
const User = require("../database/index").User;
const bcrypt = require("bcryptjs");

let router = express.Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.error(err);
    } else if (user) {
      res.json({ error: "Username already taken" });
    } else {
      const saltRounds = 5;
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(password, salt);
      var newUser = new User();
      newUser.username = username;
      newUser.password = hash;
      newUser.save(function(err) {
        if (err) {
          console.log("error in newUser.save " + err);
          res.json({ error: err.toString() });
        } else {
          res.json({ success: "Successful signup!" });
        }
      });
    }
  });
});

module.exports = router;
