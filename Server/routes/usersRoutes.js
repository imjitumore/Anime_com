const express = require("express")

const {userlogin} = require("../controllers/Login")
const { SearchAnime } = require("../controllers/Search")
const {signup} = require("../controllers/SignUp")
const { getWatchlist, updateWatchlist, removeWatchlist } = require("../controllers/Watchlist")
const {getAnimes} = require("../controllers/getAnimes")
const { updateHistory, getHistory } = require("../controllers/History")

const router = express.Router()

//User Login Route
router.post("/login",userlogin)

//Get Animes Route
router.get("/getanimes",getAnimes)

//User Signup
router.post("/signup",signup)

//सेअरच अनिमे Search Anime
router.post("/search",SearchAnime)

// User Watchlist
router.get("/getwatchlist/:id",getWatchlist)
router.delete("/removeAnime/:userId/:animeName",removeWatchlist)
router.put("/watchlist/:id",updateWatchlist)

// User History
router.get("/gethistory/:id",getHistory)
router.post("/history/:id",updateHistory)


module.exports = router