require("dotenv").config()
const mongoose = require("mongoose")
const DB_URL = process.env.MONGO_URL

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB Server"))
  .catch((err) => console.log(err))

module.exports = mongoose