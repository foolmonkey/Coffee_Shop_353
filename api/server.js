"use strict";

const PORT = 8080;
const HOST = "0.0.0.0";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const session = require("express-session");

// App
const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// headers
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// mysql database
const mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.log("Could not connect to database!");
  } else {
    console.log("connected to mysql");
  }
});
exports.connection = connection;

// authentication
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(
  session({
    resave: true,
    secret: "secret101",
    saveUninitialized: true,
  })
);
app.use(cookieParser("secret101"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

function isLoggedIn(req, res, next) {
  // check if user is logged in
  if (req.isAuthenticated()) return next();

  // send message
  res.redirect("/");
}
exports.isLoggedIn = isLoggedIn;

function isEmployee(req, res, next) {
  var sql = `SELECT * FROM EMPLOYEES;`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    var user = req.user;
    if (user) {
      result.forEach((element) => {
        if (element.EmployeeID == user.Username) {
          return next();
        }
      });
    }
  });
}
exports.isEmployee = isEmployee;

// create admin account
async function createAdmin() {
  var sql = `SELECT * FROM Employees;`;
  connection.query(sql, async (err, result) => {
    if (result.length < 1) {
      const hashedPassword = await bcrypt.hash("beans101", 10);
      const hashedUsername = await bcrypt.hash("admin", 10);
      var sql = `INSERT INTO Customers (CustomerID, FirstName, LastName, Email) VALUES
        ("admin", "Andy", "Tran", "foolmonkey99@gmail.com")`;
      connection.query(sql, async (err, result) => {
        if (err) throw err;
      });

      var sql = `INSERT INTO Employees (EmployeeID) VALUES ("admin")`;
      connection.query(sql, async (err, result) => {
        if (err) throw err;
      });

      sql = `INSERT INTO Accounts(ID, Username, Password) VALUES("${hashedUsername}", "admin", "${hashedPassword}");`;
      connection.query(sql, async (err, result) => {
        if (err) throw err;
      });

      console.log("admin account created");
    }
    if (err) throw err;
  });
}

createAdmin();

// routes
var customerRoute = require("./routes/customer.js");
var employeeRoute = require("./routes/employee.js");
var menuRoute = require("./routes/menu.js");
var ordersRoute = require("./routes/orders.js");

app.use("/customer", customerRoute);
app.use("/employee", employeeRoute);
app.use("/menu", menuRoute);
app.use("/orders", ordersRoute);

// endpoints
app.get("/", (req, res) => {
  res.send("/");
});

app.get("/connect", (req, res) => {
  connection.connect(function (err) {
    if (err) console.log("Could not connect to database!");
  });

  res.send(`Connected to database!`);
});

app.get("/end", (req, res) => {
  connection.end(function (err) {
    if (err) console.log(err);
    console.log("End connection to database");
  });

  res.send(`End connection to database`);
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) throw err;

    if (!user) res.send("Incorrect password or username.");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  var sql = `SELECT * FROM Accounts WHERE username="${req.body.username}";`;
  connection.query(sql, async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send("User exists already.");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const hashedUsername = await bcrypt.hash(req.body.username, 10);

      var sql = `INSERT INTO Customers (CustomerID, FirstName, LastName, Email) VALUES 
      ("${hashedUsername}", "${req.body.firstName}", "${req.body.lastName}", "${req.body.email}")`;
      connection.query(sql, async (err, result) => {
        if (err) throw err;
      });

      sql = `INSERT INTO Accounts(ID, Username, Password) VALUES("${hashedUsername}", "${req.body.username}", "${hashedPassword}");`;
      connection.query(sql, async (err, result) => {
        if (err) throw err;
      });

      res.send("user created");
    }
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.send("logged out");
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.listen(PORT, HOST);

console.log(`Running on PORT ${PORT}, on http://localhost/`);
