//Written By: Kara Balsom
//Date Written: Dec 13, 2022

const express = require("express"); //Imports the express module, and assigns it to the constant express.
const app = express(); //Assigns the express function to the constant app.
const PORT = 3000; //Assigns the constant PORT to 3000.

global.DEBUG = true; //Set global.debug to true.

app.set("view engine", "ejs"); //Sets the template engine view to ejs.
app.use(express.static("public")); //Adds the middleware for serving static files.
app.use(express.urlencoded({ extended: true })); //Needed to recognize incoming requests as strings/arrays so they can be processed.

app.get("/", (req, res) => {
  res.render("home.ejs"); //Render the home.ejs in the browser when the route "/" is requested.
});

const treesRouter = require("./routes/trees"); //Assigns the constant treesRouter to the middleware contained in the trees.js file in the routes folder.
app.use("/trees", treesRouter); //Uses the middleware assigned to the treesRouter when the route /trees is requested.

app.use((req, res) => {
  res.status(404).render("404"); //Renders the 404.ejs to the browser when the status is set to 404.
});
const server = app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`); //Listens on the port 3000 for requests and console logs out the message.
});

module.export = server;
