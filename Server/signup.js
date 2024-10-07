const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json()
)
app.use(cors())

const { MongoClient, CURSOR_FLAGS, ObjectId } = require("mongodb")
const url = "mongodb+srv://jitendraumore99:0wy73T6HU7ahAkIL@animecom.ukiff.mongodb.net/"
const client = new MongoClient(url)
const dbConnection = async () => {
  const result = await client.connect()
  const db = result.db("MongoDb")
  return db.collection("users")
}


app.use('/uploads', express.static('uploads'))

app.use(cors())
app.use(express.json())
const dbConnect = async () => {
  const result = await client.connect()
  const db = result.db("MongoDb")
  return db.collection("Anime_com")
}

const dbContact = async () => {
  const result = await client.connect()
  const db = result.db("MongoDb")
  return db.collection("watchlists")
}

app.get("/api/getanimes", async (req, res) => {
  try {
    const collection = await dbConnect();
    const data = await collection.find({}, { image: 1 }).toArray(); // Fetch data
    res.status(200).json(data); // Send data 
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error }); // Handle errors
  }
})


app.get("/api/getwatchlist/:id", async (req, res) => {
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
});


app.delete("/api/removeAnime/:userId/:animeName", async (req, res) => {
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
});


app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
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
    const result = await collection.insertOne({ email: email, password: password });
    console.log(result.acknowledged)
    res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error during signup", error });
  }
});

app.put("/api/watchlist/:id", async (req, res) => {
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
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
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
    res.status(200).json({ message: "Login successful..", userId: user._id, email: email });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

