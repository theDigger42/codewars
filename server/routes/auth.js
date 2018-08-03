const express = require('express')
const User = require('../../database/index').User
const bcrypt = require('bcryptjs')
const config = require('../config')
const jwt = require('jsonwebtoken')

let router = express.Router()

router.post('/', (req, res) => {
  const { username, password } = req.body

  User.findOne({ 'username': username }, (err, user) => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password'))) {
        const token = jwt.sign({
          id: user.get('id'),
          username: user.get('username')
        }, config.jwtSecret)
        res.json({ token })
        console.log('Successful login');
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } })
      }
    } else {
      console.log(err);
      res.status(401).json({ errors: { form: 'Invalid Credentials' } })
    }
  })
})

module.exports = router