const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json()
)
app.use(cors())

const {MongoClient, CURSOR_FLAGS} = require("mongodb")
const url ="mongodb+srv://jitendraumore99:0wy73T6HU7ahAkIL@animecom.ukiff.mongodb.net/"
const client = new MongoClient(url)
const dbConnection = async()=>{
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("users")
}


app.use('/uploads', express.static('uploads'))

app.use(cors())
app.use(express.json())
const dbConnect = async()=>{
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("Anime_com")
}

const dbContact = async()=>{
  const result = await client.connect()
  const db = result.db("MongoDb")
  return db.collection("watchlists")
}

app.get("/api/getanimes",async(req,res)=>{
    try {
        const collection = await dbConnect(); 
        const data = await collection.find({},{image:1}).toArray(); // Fetch data
        res.status(200).json(data); // Send data 
      } catch (error) {
        res.status(500).json({ message: "Error fetching data", error }); // Handle errors
      }
})

app.get("/api/getwatchlist",async(req,res)=>{
  try {
      const collection = await dbContact(); 
      const data = await collection.find({}).toArray(); // Fetch data
      res.status(200).json(data); // Send data 
    } catch (error) {
      res.status(500).json({ message: "Error fetching data", error }); // Handle errors
    }
})

app.post("/api/signup",async(req,res)=>{
    const { email, password } = req.body;
    console.log(email,password)
    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    try {
      const collection = await dbConnection();
  
      // Check if the user already exists in MongoDB
      const userExists = await collection.findOne({ email });
      if (userExists) {
        return res.status(409).json({ message: "User already exists." });
      }
      const result = await collection.insertOne({ email:email, password:password});
      console.log(result.acknowledged)
      res.status(201).json({ message: "User created successfully", userId: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Error during signup", error });
    }
  });

  app.post("/api/watchlist", async (req, res) => {
    try {
      const collection = await dbContact();
      const data = await collection.insertOne(req.body); // Insert data into the collection
      console.log("Data inserted:", data); // Optional: Log the inserted data
      res.status(200).json({ message: "Added to watchlist" });
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      res.status(500).json({ error: "Failed to add to watchlist" });
    }
  });
  

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
    
      try {
        const collection = await dbConnection();
    
        // Find user by email
        const user = await collection.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
    
        // Compare provided password with the stored password (no hashing here)
        if (password !== user.password) {
          return res.status(401).json({ message: "Invalid credentials." });
        }
        res.status(200).json({ message: "Login successful..", userId: user._id ,email:email});
      } catch (error) {
        res.status(500).json({ message: "Error during login", error });
      }
    });

  app.listen(4000, () => {
    console.log("Server running on port 4000");
  });

