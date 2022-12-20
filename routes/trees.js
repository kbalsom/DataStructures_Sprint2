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
    res.status(503).render("503"); //Render 503.ejs if 503 error is received.
  }
});

router.post("/input/new", async (req, res) => {
  if (DEBUG) console.log("Making tree...");
  try {
    const tree = new AVLTree(); //Call AVLTree function and assign it to constant tree.
    let numbers = []; //Set up empty array and assign it to numbers.
    numbers = req.body.numbers.split(","); //Split the request by comma and assign it to numbers.
    numbers.map((number) => {
      tree.insert(Number(number)); //Insert numbers into tree.
    });
    const stTree = JSON.stringify(tree); //Convert to JSON string.
    treesDal.addEntry(numbers, stTree); //Use addEntry function to add numbers and stringified tree to MongoDB.
    res.render("results.ejs", { tree }); //Render results to results.ejs page.
  } catch {
    res.statusCode = 503;
    res.render("503"); //Render 503.ejs if 503 error is received.
  }
});

router.get("/previous", async (req, res) => {
  if (DEBUG) console.log("Getting previous inputs and trees...");
  try {
    let previous = await treesDal.getAllPrevious(); //Use getAllPrevious function to
    res.render("previous.ejs", { previous }, function (err, html) {
      //Render results on previous.ejs.
      if (err) {
        console.log(err);
        res.render("503"); //Render 503.ejs if 503 error is received.
      } else {
        res.send(html);
      }
    });
  } catch {
    res.render("503"); //Render 503.ejs if 503 error is received.
  }
});

module.exports = router; //Export Router.
