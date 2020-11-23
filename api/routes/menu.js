var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// menu
router.get("/create", (req, res) => {
  var sql = `CREATE TABLE Menu (Name VARCHAR(255) NOT NULL, Description VARCHAR(300), Category VARCHAR(255) NOT NULL, Price VARCHAR(255) NOT NULL;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created menu table`);
});

router.get("/", (req, res) => {
  var sql = `SELECT * FROM Menu;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
  connection.end();

  res.send("Get menu");
});

router.get("/:category", (req, res) => {
  var sql = `SELECT * FROM Menu WHERE Category=${req.params.category};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
  connection.end();

  res.send("Get filtered menu");
});

router.post("/insert", (req, res) => {
  var sql = `INSERT INTO Menu (Name, Description, Category, Price) VALUES (
      "${req.body.name}", 
      "${req.body.description}",
      "${req.body.category}", 
      "${req.body.price}",
      );`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
  connection.end();

  res.send(`Added ${req.body.name} to menu!`);
});

router.post("/update", (req, res) => {
  var sql = `UPDATE Menu SET "${req.body.name}", 
  "${req.body.description}",
  "${req.body.category}", 
  "${req.body.price}" 
  WHERE Name="${req.body.name}";`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Updated menu item with name ${req.body.name}`);
});

router.get("/delete", (req, res) => {
  var sql = `DELETE FROM Menu WHERE Name =${req.body.name}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete ${req.body.name} from menu`);
});

module.exports = router;
