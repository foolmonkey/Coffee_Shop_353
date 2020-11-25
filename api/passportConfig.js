const connection = require("./server");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      var sql = `SELECT * FROM Accounts WHERE Username = "${username}";`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        if (!result.length) {
          return done(null, false);
        }

        bcrypt.compare(password, result[0].Password, (err, resultCompare) => {
          if (err) throw err;
          if (resultCompare === true) {
            return done(null, result[0]);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.ID);
  });

  passport.deserializeUser((id, done) => {
    var sql = `SELECT * FROM Accounts WHERE ID = "${id}";`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      done(err, result[0]);
    });
  });
};
