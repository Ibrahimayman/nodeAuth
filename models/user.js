/**
 * Created by Ibrahim Ayman on 16/07/2017.
 */
var mongoose = require("mongoose"),
    bcrypt = require("bcryptjs"),
    crypto = require("crypto");

var userSchema = new mongoose.Schema({
    username: {type: String, index: true, unique: true},
    password: {type: String, bcrypt: true, required: true},
    email: {type: String},
    name: {type: String},
    ProfileImg: {type: String}
});


module.exports.createUser = function (newUser, callback) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) throw err;
        // set hashed pass
        newUser.password = hash;
        newUser.save(callback);
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    })
};


module.exports = mongoose.model("User", userSchema);