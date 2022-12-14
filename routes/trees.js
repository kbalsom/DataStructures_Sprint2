const express = require("express");
const router = express.Router();
// const actorsDal = require('../services/pg.actors.dal')
const treesDal = require("../services/trees.dal");
const avl = require("'../services/avl");

router.get("/", async (req, res) => {
  if (DEBUG) console.log("Working?");
  try {
    //binarysearchtree function
    const numbers = req.body.numbers;
    //const tree = results of bst function
    // await treesDal.addEntry(numbers, tree);
    // const theTree = tree;
    res.render("results.ejs", { numbers });
  } catch {
    console.log("RIGHT HERE");
    res.statusCode = 503;
    res.render("503");
  }
});

router.get("/previous", async (req, res) => {
  if (DEBUG) console.log(req.query);
  console.log("Line 25");
  try {
    let previous = await treeDal.getAllPrevious();
    res.render("previous.ejs", { previous }, function (err, html) {
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
