const express = require("express")
const app = express()
const cors = require("cors")
const userRoute = require("./routes/usersRoutes")
const adminRoute = require("./routes/adminRoutes")
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.json())

app.use("/api",userRoute)// User Route
app.use("/api",adminRoute)// Admin Route

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

