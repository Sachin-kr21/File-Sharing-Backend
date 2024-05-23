const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sachin:sachin@cluster0.rxamc8z.mongodb.net/file?retryWrites=true&w=majority&appName=Cluster0';

module.exports = async function initializeDatabase(callback) {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const temp = mongoose.connection.db.collection("file");
        const tempData = await temp.find({}).toArray();
        // console.log('tempData',tempData);
        callback(null, tempData);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        callback(error);
    }
};