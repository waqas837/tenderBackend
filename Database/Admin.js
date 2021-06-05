const mongoose = require("mongoose");
const validator = require("validator");

var adminSch = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("emailWrongPattern");
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}); 
 
const admin = new mongoose.model("adminT", adminSch);
 
module.exports = { admin };
