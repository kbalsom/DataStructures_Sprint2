const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getAllPrevious() {
  if (DEBUG) console.log("Getting all previous inputs and resulting trees...");
  try {
    await dal.connect();
    const cursor = dal.db("algosprint").collection("trees").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function addEntry(numbers, tree) {
  if (DEBUG) console.log("Adding input and resulting tree to MongoDB...");
  let newEntry = JSON.parse(
    `{ "input": "` + numbers + `", "tree": "` + tree + `" }`
  );
  try {
    await dal.connect();
    const result = await dal
      .db("algosprint")
      .collection("trees")
      .insertOne(newEntry);
    return result.insertedId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllPrevious,
  addEntry,
};
