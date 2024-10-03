const {MongoClient} = require("mongodb")
const express = require("express")
const app = express()
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const cors = require('cors'); 
app.use('/uploads', express.static('uploads'))

app.use(cors())
app.use(express.json())
const dbConnect = async()=>{
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("Anime_com")
}

app.get("/api/getanimes",async(req,res)=>{
    try {
        const collection = await dbConnect(); 
        const data = await collection.find({},{image:1}).toArray(); // Fetch data
        console.log(data)
        res.status(200).json(data); // Send data 
      } catch (error) {
        res.status(500).json({ message: "Error fetching data", error }); // Handle errors
      }
      //k;sk
})

const port = 4000
app.listen(port,()=>{
    console.log(`Server running on ${port}`)
} )
