const {userlogin} = require("../controllers/Login")
const {signup} = require("../controllers/SignUp")
const {getAnimes} = require("../controllers/getAnimes")
signup
const express = require("express")
const router = express.Router()

//User Login Route
router.post("/login",userlogin)

//Get Animes Route
router.get("/getanimes",getAnimes)

//
router.post("/signup",signup)
module.exports = router