const client = require("../config")
const { ObjectId } = require("mongodb");

const dbConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("users")
}

//app.post('/api/changepassword/:id',
const changepass =  async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;
  
    try {
      const collection = await dbConnection();
      const user = await collection.findOne({ _id: new ObjectId(userId) });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      if (currentPassword !== user.password) {
        return res.status(400).json({ message: 'Current password is incorrect.' });
      }
  
      // Update the password in the database (plain text)
      await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: newPassword } }
      );
  
      res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'An error occurred while changing password.', error });
    }
  }

  module.exports = { changepass }