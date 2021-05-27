const mongoose = require("mongoose");
const validator = require("validator");
mongoose
  .connect(
    "mongodb+srv://haris:haris@cluster0.eg5ud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`DB connection failed ${err}`));
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
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
