//Algorithms and Data Structures
//Written By: Kara Balsom
//Date Written: Dec 14, 2022

const dal = require("./mdb"); //Require Mongo database from mdb.js and assign the constant dal.

async function getAllPrevious() {
  //Function to get all previous inputs and trees.
  if (DEBUG) console.log("Getting all previous inputs and resulting trees...");
  try {
    await dal.connect(); //Connect to Mongo database.
    const cursor = dal.db("algosprint").collection("trees").find(); //Get all the entries from the collection.
    const results = await cursor.toArray(); //Return the array.
    return results; //Return results.
  } catch (error) {
    console.log(error);
  }
}

async function addEntry(numbers, tree) {
  //Function to add an entry to the Mongo database. Parameters are the input and the tree.
  console.log("Adding input and resulting tree to MongoDB...");
  let newEntry = JSON.parse(
    //Parse the parameters into JSON data.
    `{ "input": "` + numbers + `", "tree": ` + tree + ` }`
  );
  try {
    await dal.connect(); //Connect to Mongo database.
    const result = await dal
      .db("algosprint")
      .collection("trees")
      .insertOne(newEntry); //Insert the entry.
    return result.insertedId; //Return results.
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  //Export the functions.
  getAllPrevious,
  addEntry,
};
