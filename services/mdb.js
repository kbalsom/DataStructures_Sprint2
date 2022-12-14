const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://kbalsom:MacAlex@algosprintcluster.qtpp7c4.mongodb.net/test";
const pool = new MongoClient(uri);

module.exports = pool;
