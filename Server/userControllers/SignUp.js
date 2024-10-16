const client = require("../config")
const dbConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("users")
}

const signup =  async (req, res) => {
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
}

module.exports = {signup}