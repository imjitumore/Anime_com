const client = require("../config")
const { ObjectId } = require("mongodb");

const AdminConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("Admin")
}

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.params.id;
  
    try {
      const collection = await AdminConnection();
      const admin = await collection.findOne({ _id: new ObjectId(adminId) });
      console.log(admin,currentPassword,newPassword)
      if (!admin) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      if (currentPassword !== admin.password) {
        return res.status(400).json({ message: 'Current password is incorrect.' });
      }
  
      // Update the password in the database (plain text)
      await collection.updateOne(
        { _id: new ObjectId(adminId) },
        { $set: { password: newPassword } }
      );
  
      res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'An error occurred while changing password.', error });
    }
  }

module.exports = {changePassword}