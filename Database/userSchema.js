const mongoose = require("mongoose");
const validator = require("validator");

const tenderorbidder = new mongoose.Schema({
  username:{
    unique: true,
    type: String,
  },
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
  },
  cpassword: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  }
}); 
 
const usersignup = new mongoose.model("tenderbidder", tenderorbidder);
 
module.exports = { usersignup };
