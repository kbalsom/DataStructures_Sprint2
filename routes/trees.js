const express = require("express");
const router = express.Router();
// const actorsDal = require('../services/pg.actors.dal')
const treesDal = require("../services/trees.dal");

router.get("/", async (req, res) => {
  try {
    let theFilms = await filmsDal.getFilms();
    if (DEBUG) console.table(theFilms);
    res.render("films", { theFilms });
  } catch {
    res.statusCode(503).res.render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("films.POST");
  try {
    await filmsDal.addFilm(req.body.title, req.body.year);
    res.redirect("/films/");
  } catch {
    res.statusCode(503).res.render("503");
    myEmitter.emit("status", `Status Code: ${res.statusCode}`);
  }
});

module.exports = router;
