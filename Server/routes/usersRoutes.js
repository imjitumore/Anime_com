const express = require("express")

const {userlogin} = require("../userControllers/Login")
const { SearchAnime } = require("../userControllers/Search")
const {signup} = require("../userControllers/SignUp")
const { getWatchlist, updateWatchlist, removeWatchlist } = require("../userControllers/Watchlist")
const {getAnimes} = require("../userControllers/getAnimes")
const { updateHistory, getHistory } = require("../userControllers/History")
const { changepass } = require("../userControllers/changePassword")
const { userProfile, getUserProfile } = require("../userControllers/Profile")

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

// Change password
router.post("/changepassword/:id",changepass)

// User Profile
router.post("/profile/:userId",userProfile)
router.post("/getUsersProfile/:userId",getUserProfile)



module.exports = router