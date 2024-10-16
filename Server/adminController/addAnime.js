const client = require("../config")
const dbConnect  = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("Anime_com")
}

//app.post('/api/addAnime',
const addAnime = async (req, res) => {
    try {
      const collection = await dbConnect()
      const newData = req.body;
      // Find the anime by ID and update
      const anime = await collection.insertOne(newData);

      res.status(200).json({message:"Add New Successfully..!"});
    } catch (error) {
      res.status(500).json({ message: 'Error For Add New ANime', error });
    }
  }

module.exports = {addAnime}