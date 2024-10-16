const express = require("express")
const { adminSignup } = require("../adminController/Signup")
const { adminLogin } = require("../adminController/Login")
const { getUsers } = require("../adminController/getUsers")
const { addAnime } = require("../adminController/addAnime")
const { updateAnime } = require("../adminController/updateAnime")
const { removeAnime } = require("../adminController/removeAnime")
const { changePassword } = require("../adminController/changePassword")

const router = express.Router()

// Admin Signup
router.post("/adminSignup",adminSignup)

// Admin Login
router.post("/adminLogin",adminLogin)

// Get Users
router.get("/getUsers",getUsers)

// Add Anime
router.post("/addAnime",addAnime)

// Update Anime
router.put("/updateAnime/:name",updateAnime)

// Remove Anime
router.delete("/deleteAnime",removeAnime)

// Change Password
router.post("/changepass/:id",changePassword)



module.exports = router