const client = require("../config")
const { ObjectId } = require("mongodb");

const AdminConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("Admin")
}

const adminSignup =  async (req, res) => {
    const { email, password,firstName,lastName } = req.body;
    // Check if the email and password are provided
    if (!email || !password || !firstName ||!lastName) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      const collection = await AdminConnection();
  
      const userExists = await collection.findOne({ email });
      if (userExists) {
        return res.status(409).json({ message: "User already exists." });
      }
      const result = await collection.insertOne({ email: email, password: password,firstName:firstName,lastName:lastName});
      console.log(result.acknowledged)
      res.status(201).json({ message: "User created successfully", userId: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Error during signup", error });
    }
  }

module.exports = {adminSignup}