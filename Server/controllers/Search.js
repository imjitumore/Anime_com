const client = require("../config")
const dbConnect  = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("Anime_com")
  }

const SearchAnime =  async (req, res) => {
    try {
      const collection = await dbConnect();
      const data = await collection.find({
        $or: [
          {
            name: { $regex: req.body.name, $options: "i" } // Case-insensitive search
          }
        ]
      }).toArray(); 
      console.log(data)
      res.status(200).json(data); // Send data 
    } catch (error) {
      res.status(500).json({ message: "Error fetching data", error }); // Handle errors
    }
  }

module.exports = {SearchAnime}