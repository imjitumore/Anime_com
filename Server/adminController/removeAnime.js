const client = require("../config")
const dbConnect  = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("Anime_com")
}

//app.delete("/api/deleteAnime",
const removeAnime =  async (req, res) => {
    try {
      const collection = await dbConnect();
      const { name } = req.body; // Destructure `name` from the request body
  
      const result = await collection.deleteOne({ name });
      console.log(result)
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Anime not found in Collection " });
      }
  
      res.status(200).json({ message: "Anime removed from from Anime Collectioon", data: result });
    } catch (error) {
      console.error("Error removing anime from Anime Collectioon:", error);
      res.status(500).json({ message: "Server error while trying to remove anime", error });
    }
  }

module.exports = {removeAnime}