const client = require("../config")
const dbConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("users")
  }

const getWatchlist =  async (req, res) => {
    try {
      const collection = await dbConnection();
      const userId = req.params.id;
  
      const user = await collection.findOne({ _id: new ObjectId(userId) });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user.watchlist || []);
    } catch (error) {
      console.error("Error fetching user watchlist:", error); // Log the error
      res.status(500).json({ message: "Error fetching data", error }); // Handle errors
    }
}


const removeWatchlist = async (req, res) => {
    try {
      const collection = await dbConnection();
      const { userId, animeName } = req.params;  // Get userId and animeName from the URL parameters
  
      // Find and update the user's watchlist by pulling the anime from the array
      const result = await collection.updateOne(
        { _id:  new ObjectId(userId) },  // Match the user by their ObjectId
        { $pull: { watchlist: { name: animeName } } }  // Remove the anime from the watchlist array
      );
  
      // Check if the anime was found and removed from the watchlist
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Anime not found in watchlist" });
      }
  
      res.status(200).json({ message: "Anime removed from watchlist", data: result });
    } catch (error) {
      console.error("Error removing anime from watchlist:", error);
      res.status(500).json({ message: "Server error while trying to remove anime", error });
    }
}


const updateWatchlist =  async (req, res) => {
    console.log(req.params.id)
    try {
      const collection = await dbConnection();
      const data = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $push: { watchlist: req.body  }}); // update data into the collection
      console.log("Data updated:", data); // Optional: Log the inserted data
      res.status(200).json({ message: "Added to watchlist" });
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      res.status(500).json({ error: "Failed to add to watchlist" });
    }
}


module.exports = {getWatchlist,removeWatchlist,updateWatchlist}