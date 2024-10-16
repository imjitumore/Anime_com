const client = require("../config")
const { ObjectId } = require("mongodb");

const AdminConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("Admin")
}

//app.post("/api/adminLogin",
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    try {
      const collection = await AdminConnection();
      const admin = await collection.findOne({ email });
      if (!admin) {
        console.log("User not found for email:", email); // Add log for debugging
        return res.status(404).json({ message: "User not found." });
      }
  
      if (password !== admin.password) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      res.status(200).json({ message: "Login successful..", adminId: admin._id, email: email,fname:admin.firstName, lname:admin.lastName});
    } catch (error) {
      res.status(500).json({ message: "Error during login", error });
    }
  }

  module.exports ={adminLogin}