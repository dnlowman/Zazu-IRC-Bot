import mongoose = require('mongoose');

var UserSchema: mongoose.Schema = new mongoose.Schema({
    Name: String,
    LastSeen: Date
});

export = mongoose.model('UserSchema', UserSchema);
