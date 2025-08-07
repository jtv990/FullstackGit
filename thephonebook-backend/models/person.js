const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.connect(url).then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Error connecting to MongoDB:", error.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

module.exports = mongoose.model("Person", personSchema)