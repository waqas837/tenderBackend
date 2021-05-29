const mongoose = require("mongoose");
const validator = require("validator");

var tenderorbidder = new mongoose.Schema({
  username:{
    type: String,
  },
  phone:{
    unique: true,
    type: String,
  },
  selectedFile:{
   type:String,
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
