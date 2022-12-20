//Algorithms and Data Structures
//Written By: Kara Balsom
//Date Written: Dec 14, 2022

const express = require("express"); //Require express and assign it to the constant express.
const router = express.Router(); //Set up express router.
const treesDal = require("../services/trees.dal"); //Require trees.dal.js and assign it to the constant treesDal.
const { AVLTree } = require("../services/avl"); //Import AVLTree function from avl.js.

router.get("/input", async (req, res) => {
  try {
    res.render("input", { title: "Make A Tree" }); //Render the input.ejs
  } catch (error) {
    console.error(error);
    res.status(503).render("503");
  }
});

router.post("/input/new", async (req, res) => {
  if (DEBUG) console.log("Making tree...");
  try {
    const tree = new AVLTree();
    let numbers = [];
    numbers = req.body.numbers.split(",");
    numbers.map((number) => {
      tree.insert(Number(number));
    });
    const stTree = JSON.stringify(tree);
    treesDal.addEntry(numbers, stTree);
    res.render("results.ejs", { tree });
  } catch {
    res.statusCode = 503;
    res.render("503");
  }
});

router.get("/previous", async (req, res) => {
  if (DEBUG) console.log("Getting previous inputs and trees...");
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
