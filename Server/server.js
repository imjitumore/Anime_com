const express = require("express")
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express()
const cors = require("cors")
const userRoute = require("./routes/usersRoutes")
app.use(express.json())
app.use(cors())
const { MongoClient, CURSOR_FLAGS, ObjectId } = require("mongodb")
const url = "mongodb+srv://jitendraumore99:0wy73T6HU7ahAkIL@animecom.ukiff.mongodb.net/"
const client = new MongoClient(url)

const dbConnect  = async () => {
  const result = await client.connect()
  const db = result.db("MongoDb")
  return db.collection("Anime_com")
}

const dbConnection = async () => {
  const result = await client.connect()
  const db = result.db("MongoDb")
  return db.collection("users")
}
app.use('/uploads', express.static('uploads'))

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

app.use(express.json())

app.use("/api",userRoute)



app.post('/api/profile/:userId', (req, res) => {
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
});





app.post('/api/changepassword/:id', async (req, res) => {
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
});

app.post('/api/changepass/:id', async (req, res) => {
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
});




//Admin APIS

const AdminConnection = async () => {
  const result = await client.connect()
  const db = result.db("MongoDb")
  return db.collection("Admin")
}

app.post("/api/adminLogin", async (req, res) => {
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
});


app.post("/api/adminSignup", async (req, res) => {
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
});

app.get("/api/getUsers", async (req, res) => {
  try {
    const collection = await dbConnection();
    const result = await collection.find({}).toArray(); // Don't forget to use .toArray() to fetch the results.
    console.log(result)
    res.status(200).json({ message: "All Users Found", users: result });
  } catch (error) {
    res.status(404).json({ message: "No data Found", error: error.message });
  }

});

app.get("/api/getUsersProfile/:userId", async (req, res) => {
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

});

app.put('/api/updateAnime/:name', async (req, res) => {
  try {
    const collection = await dbConnect()
    const animeName = req.params.name
    const updatedData = req.body;
    console.log(updatedData,animeName)

    // Find the anime by ID and update
    const anime = await collection.updateOne({name:animeName},{$set:(updatedData)});
    console.log(anime)
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }

    res.status(200).json({message:"Update Successfully..!"});
  } catch (error) {
    res.status(500).json({ message: 'Error updating anime', error });
  }
});



app.delete("/api/deleteAnime", async (req, res) => {
  try {
    const collection = await dbConnect();
    const { name } = req.body; // Destructure `name` from the request body

    const result = await collection.deleteOne({ name });
    console.log(result)
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Anime not found in Collection " });
    }

    res.status(200).json({ message: "Anime removed from from Anime Collectioon", data: result });
  } catch (error) {
    console.error("Error removing anime from Anime Collectioon:", error);
    res.status(500).json({ message: "Server error while trying to remove anime", error });
  }
});

app.post('/api/addAnime', async (req, res) => {
  try {
    const collection = await dbConnect()
    const newData = req.body;
    console.log(newData)

    // Find the anime by ID and update
    const anime = await collection.insertOne(newData);
    console.log(anime)
    

    res.status(200).json({message:"Add New Successfully..!"});
  } catch (error) {
    res.status(500).json({ message: 'Error For Add New ANime', error });
  }
});



app.listen(4000, () => {
  console.log("Server running on port 4000");
});

