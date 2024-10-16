const client = require("../config")
const { ObjectId } = require("mongodb");
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const dbConnection = async () => {
    const result = await client.connect()
    const db = result.db("MongoDb")
    return db.collection("users")
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 } ,
      fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single('profile'); 
  
  
  function checkFileType(file, cb) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
  

//app.post('/api/profile/:userId'
const userProfile = async (req, res) => {
    const userId = req.params.userId;
  
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const filePath = req.file.path;
      console.log(filePath,userId)
      try {
        const collection = await dbConnection()
  
        const result = await collection.updateOne(
          { _id: new  ObjectId(userId) }, // You can also use { userName: req.body.userName } if updating by userName
          { $set: { profileImage: filePath } }
        );
  
        if (result.modifiedCount === 1) {
          return res.status(200).json({
            message: 'File uploaded and user profile updated successfully',
            filePath: filePath,
          });
        } else {
          return res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Database error' });
      }
    });
}


//app.get("/api/getUsersProfile/:userId",
    
const getUserProfile = async (req, res) => {
    try {
      const collection = await dbConnection();
      const userId = req.params.userId
      console.log(userId)
      const result = await collection.findOne({ _id: new ObjectId(userId) }) // Don't forget to use .toArray() to fetch the results.
      console.log(result)
      res.status(200).json({ message: "All Users Found", users: result });
    } catch (error) {
      res.status(404).json({ message: "No data Found", error: error.message });
    }
  
  }

module.exports = { userProfile , getUserProfile }
  