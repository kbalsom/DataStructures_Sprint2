const express = require("express");
const router = express.Router();
// const actorsDal = require('../services/pg.actors.dal')
const treesDal = require("../services/trees.dal");
const { AVLTree } = require("../services/avl");

router.get("/input", async (req, res) => {
  try {
    res.render("input", { title: "Make A Tree" });
  } catch (error) {
    console.error(error);
    res.status(503).render("503");
  }
});

router.post("/input/new", async (req, res) => {
  if (DEBUG) console.log("Working?");
  try {
    const tree = new AVLTree();
    let numbers = [];
    numbers = req.body.numbers.split(",");
    for (i = 0; i < numbers.length; i++) {
      tree.insert(numbers[i]);
    }
    const stTree = JSON.stringify(tree);
    treesDal.addEntry(numbers, stTree);
    res.render("results.ejs", { tree });
  } catch {
    res.statusCode = 503;
    res.render("503");
  }
});

router.get("/previous", async (req, res) => {
  if (DEBUG) console.log(req.query);
  console.log("Line 25");
  try {
    let previous = await treesDal.getAllPrevious();
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
