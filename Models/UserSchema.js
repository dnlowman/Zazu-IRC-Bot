var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    Name: String,
    LastSeen: Date
});
module.exports = mongoose.model('UserSchema', UserSchema);
