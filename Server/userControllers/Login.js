const client = require("../config")
const dbConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("users")
}

  const userlogin = async (req, res) => {
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
  
      // Compare provided password with the stored password
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      const profileImageUrl = user.profileImage 
  
      res.status(200).json({
        message: "Login successful...New Messgae",
        userId: user._id,
        email: user.email,
        profileImage: profileImageUrl, // Send complete image URL
      });  } catch (error) {
      res.status(500).json({ message: "Error during login", error });
    }
  }

  module.exports = {userlogin}


  