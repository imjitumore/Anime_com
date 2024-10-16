const client = require("../config")
const dbConnect  = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("Anime_com")
}

//app.put('/api/updateAnime/:name', 
const updateAnime = async (req, res) => {
    try {
      const collection = await dbConnect()
      const animeName = req.params.name
      const updatedData = req.body;
      console.log(updatedData,animeName)
  
      // Find the anime by ID and update
      const anime = await collection.updateOne({name:animeName},{$set:(updatedData)});
      console.log(anime)
      if (!anime) {
        return res.status(404).json({ message: 'Anime not found' });
      }
  
      res.status(200).json({message:"Update Successfully..!"});
    } catch (error) {
      res.status(500).json({ message: 'Error updating anime', error });
    }
  }

module.exports = {updateAnime}