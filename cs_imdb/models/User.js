var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
  username: String,
  email: { type: String, index: true, unique: true, required: true },
  password:  {type: String, required: true },
  fname: String,
  lname: String,
  movieList: String
},
{collection: 'users'})

var User = mongoose.model('User', userSchema);

userSchema.plugin(uniqueValidator);
module.exports = User;