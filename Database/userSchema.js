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
// Product schema
const productSchema = new mongoose.Schema({
  title:String,
  price:String,
  // {} owner will single for the a product
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"usersignup"
  }
});
//admin
const admin = new mongoose.Schema({
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
});

// addtocart schema
const addtocart = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
});
// Services schema
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    unique:true
  },

  price: {
    type: String,
  },
  description: {
    type: String,
  },
});
const usersignup = new mongoose.model("tenderbidder", tenderorbidder);
const Product = new mongoose.model("productData", productSchema);
const AdminData = new mongoose.model("adminData", admin);
const ServiceData = new mongoose.model("serviceData", serviceSchema);
const cartadd = new mongoose.model("addtocartitems", addtocart);
module.exports = { usersignup, Product, AdminData, ServiceData,cartadd };
