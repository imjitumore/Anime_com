const mongoose = require('mongoose');
const express = require("express");
const app = express();
const cors = require("cors")

mongoose.connect("mongodb://localhost:27017/MongoDb");

app.use(express.json());
app.use(cors())
// Anime schema
const animeSchema = mongoose.Schema({
    bgimage: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    language: { type: String, required: true },
    rating: { type: String, required: true },
    releaseyear: { type: String, required: true },
    seasons: { type: String, required: true },
    category: { type: String, required: true },
    episodes: { type: String, required: true },
    writer: { type: String, required: true },
    duration: { type: String, required: true },
    stars: { type: String, required: true },
    summary: { type: String, required: true },
    youtube: { type: String, required: true }
});

const AnimeCom = mongoose.model("anime_coms", animeSchema);

// Get animes
app.get("/api/getanimes", async (req, res) => {
    try {
        const data = await AnimeCom.find();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

const WatchList = mongoose.model("watchlists", animeSchema);

// Add to watchlist
app.post("/api/watchlist", async (req, res) => {
    try {
        const anime = new WatchList(req.body); // Create new anime document
        const savedAnime = await anime.save(); // Save the document
        console.log("Data inserted:", savedAnime);
        res.status(200).json({ message: "Added to watchlist", data: savedAnime });
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        res.status(500).json({ error: "Failed to add to watchlist" });
    }
});


// Get watchlist
app.get("/api/getwatchlist", async (req, res) => {
    try {
        const data = await WatchList.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

// User schema
const userSchema = mongoose.Schema({
    email: { type: String, required: true }, // Corrected typo: "emial" to "email"
    password: { type: String, required: true }
});

const User = mongoose.model("users", userSchema);

// Login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Compare passwords (in production, use password hashing)
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        res.status(200).json({ message: "Login successful.", userId: user._id, email: email });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
});

// Signup
app.post("/api/signup", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists." });
        }

        const newUser = new User({ email, password });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully", userId: savedUser._id });
    } catch (error) {
        res.status(500).json({ message: "Error during signup", error });
    }
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
