const client = require("../config");
const { ObjectId } = require("mongodb");

const dbConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("users")
}

//app.get("/api/getUsers",
const getUsers = async (req, res) => {
    try {
      const collection = await dbConnection();
      const result = await collection.find({}).toArray(); // Don't forget to use .toArray() to fetch the results.
      console.log(result)
      res.status(200).json({ message: "All Users Found", users: result });
    } catch (error) {
      res.status(404).json({ message: "No data Found", error: error.message });
    }
  
}

module.exports = {getUsers}