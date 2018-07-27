var LocalStrategy = require('passport-local').Strategy;
// var User = require('.../database/index.js');
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');
var passport = require('passport');

Promise.promisifyAll(bcrypt);

test('should successfully login to account', () => {
  const testAccount = '234';
  const testPassword = '234';
  
  passport.use('local-login', new LocalStrategy(
    {
      username: 'username',
      password: 'password',
      passReqToCallback: true,
    },
    function(req, testAccount, testPassword, callback) {
      process.nextTick(function() {
        User.findOne({'username': username}, function(err, user) {
          if (user) {
            return bcrypt.compareAsync(password, user.password)
            .then((result) => {
              expect(result).toBe(user.password);
            });
          }
        });
      });
    }
  ))
})