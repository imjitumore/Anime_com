const client = require("../config");
const { ObjectId } = require("mongodb");

const dbConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("users")
}

const getHistory= async (req, res) => {
    try {
      const collection = await dbConnection();
      const userId = req.params.id;
  
      const user = await collection.findOne({ _id: new ObjectId(userId) });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user.history || []);
    } catch (error) {
      console.error("Error fetching user watchlist:", error); // Log the error
      res.status(500).json({ message: "Error fetching data", error }); // Handle errors
    }
}

const updateHistory =  async (req, res) => {
    try {
      const collection = await dbConnection();
      const userId = req.params.id;
      
      const user = await collection.findOne({ _id: new ObjectId(userId) });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },  // Match the user by ObjectId
        { $push: { history: req.body } }  // Add the anime to the history array
      );
  
      res.status(200).json({ message: "Anime added to history", data: result });
    } catch (error) {
      console.error("Error adding to history:", error);
      res.status(500).json({ message: "Error adding to history", error });
    }
}

module.exports = { getHistory , updateHistory}