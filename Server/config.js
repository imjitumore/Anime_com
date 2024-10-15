const { MongoClient, CURSOR_FLAGS, ObjectId } = require("mongodb")
const url = "mongodb+srv://jitendraumore99:0wy73T6HU7ahAkIL@animecom.ukiff.mongodb.net/"
const client = new MongoClient(url)
module.exports = client