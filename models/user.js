/**
 * Created by Ibrahim Ayman on 16/07/2017.
 */
var mongoose = require("mongoose");
var db = mongoose.connection;

var userSchema = new mongoose.Schema({
    username: {type: String, index: true},
    password: {type: String},
    email: {type: String},
    name: {type: String},
    ProfileImg: {type: String}
});

module.exports = mongoose.model("User", userSchema);
module.exports.createUser = function (newUser, callback) {
    newUser.save(callback);
};
