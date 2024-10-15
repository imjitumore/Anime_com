const {userlogin} = require("../controllers/Login")
const { SearchAnime } = require("../controllers/Search")
const {signup} = require("../controllers/SignUp")
const {getAnimes} = require("../controllers/getAnimes")

const express = require("express")
const router = express.Router()

//User Login Route
router.post("/login",userlogin)

//Get Animes Route
router.get("/getanimes",getAnimes)

//User Signup
router.post("/signup",signup)

//सेअरच अनिमे Search Anime
router.post("/search",SearchAnime)
module.exports = router