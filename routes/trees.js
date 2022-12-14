const express = require("express");
const router = express.Router();
// const actorsDal = require('../services/pg.actors.dal')
const treesDal = require("../services/trees.dal");

// router.get("/", async (req, res) => {
//   try {
//     let theFilms = await filmsDal.getFilms();
//     if (DEBUG) console.table(theFilms);
//     res.render("films", { theFilms });
//   } catch {
//     res.statusCode(503).res.render("503");
//     myEmitter.emit("status", `Status Code: ${res.statusCode}`);
//   }
// });

router.post("/", async (req, res) => {
  if (DEBUG) console.log("ADDING NUMBERS");
  console.log(req.body);
  try {
    await treesDal.addNumbers(req.body);
    res.redirect("/results");
  } catch {
    res.statusCode(503).res.render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
  }
});

router.get("/", async (req, res) => {
  if (DEBUG) console.log(req.query);
  try {
    let numbers = await treeDal.getAllPrevious(
      req.query.searchTerm,
      req.query.database
    );
    res.render("results.ejs", { movies }, function (err, html) {
      if (err) {
        console.log(err);
        res.render("503");
      } else {
        res.send(html);
      }
    });
  } catch {
    res.render("503");
  }
});

module.exports = router;
