const mongoose = require("mongoose");

const { Schema } = mongoose;

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true  // Enforce uniqueness on the 'name' field
    },
    cid: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('files', fileSchema);
