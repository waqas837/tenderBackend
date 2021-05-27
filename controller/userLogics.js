const { usersignup, Product, AdminData, ServiceData,cartadd } = require("../Database/userSchema");
var jwt = require('jsonwebtoken');
const signup = async (req, res) => {
  const data = req.body;
  console.log(data);
 
  try {
    if(data.password!==data.cpassword){
      res.json({passerr:"passerr"})
    }
       if(data.password===data.cpassword){
        const dataCheck = new usersignup(data);
        await dataCheck.save();
        jwt.sign({ email: dataCheck.email }, "thisisthesecretkey", function(err, token) {
        res.json({token:token,status:dataCheck.status});
        console.log(err);
       });
       }

  } catch (error) {
    console.log(`error during signup ${error}`);
    // console.log(error);
    res.json(error);
  }
};

//sign in data
const singin = async (req, res) => {
  const { email, password} = req.body;
  var {authorization} = req.headers
  const token = authorization.replace("Bearer ", "");
   try {
    const isExists = await usersignup.findOne({email,password});
     if (isExists===null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
         res.json({ success: "true", user: decoded, status:isExists.status })  
         if(err){
          res.json({ValidUser:"false"})
         }
      });
      
    }
  
 
    // console.log(isExists);
    //respose
    
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
// get all data
const getData = async (req, res) => {
  try {
    const data = await usersignup.find();
    res.json({ data });
  } catch (error) {
    console.log(`error during the getall data`);
  }
};
//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userDelete = await usersignup.findByIdAndDelete({ _id: id });
    // console.log(userDelete);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
//update a user
const udpateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const newData = await usersignup.findByIdAndUpdate({ _id: id }, data);
    res.json({ data: newData });
  } catch (error) {
    console.log(`error during the updateUser ${error}`);
  }
};
//find a single user
const findSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await usersignup.findById({ _id: id });
    res.json({ data });
  } catch (error) {
    console.log(`error during find a one user ${error}`);
  }
};
// add products
const addProduct = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const dataCheck = new Product(data);
    await dataCheck.save();
    res.json(dataCheck.email);
  } catch (error) {
    console.log(`error during adding a product ${error}`);
    console.log(error);
    res.json(error);
  }
};

// get all data
const getProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.json({ data });
  } catch (error) {
    console.log(`error during the getall product data`);
  }
};
// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await Product.findByIdAndDelete({ _id: id });
    // console.log(userDelete);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
//update the products
const udpateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const newData = await Product.findByIdAndUpdate({ _id: id }, data);
    res.json({ data: newData });
  } catch (error) {
    console.log(`error during the update products ${error}`);
  }
};

//find products acc. to the user only populate the products field inside the user schema
const findSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.find({_id:id}).populate("products");
    res.json({ data });
  } catch (error) {
    console.log(`error during find a one user ${error}`);
  }
};
// admin singup
const signupAdmin = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    if (data.password === data.cpassword) {
      const dataCheck = new AdminData(data);
      await dataCheck.save();
      res.json(dataCheck.email);
    } else {
      res.json({ passerr: "passerr" });
    }
  } catch (error) {
    console.log(`error during signup ${error}`);
    console.log(error);
    res.json(error);
  }
};

//sign in data
const AdminSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExists = await AdminData.findOne({ email, password });
    // console.log(isExists);
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({ success: "success", user: isExists.email });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

// logic for services

// get all data
const getserviceData = async (req, res) => {
  try {
    const data = await ServiceData.find();
    res.json({ data });
  } catch (error) {
    console.log(`error during the getall data`);
  }
};
//delete user
const deleteServiceData = async (req, res) => {
  const { id } = req.params;
  try {
    const userDelete = await ServiceData.findByIdAndDelete({ _id: id });
    // console.log(userDelete);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
//update a user
const updateServiceData = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const newData = await ServiceData.findByIdAndUpdate({ _id: id }, data);
    res.json({ data: newData });
  } catch (error) {
    console.log(`error during the updateUser ${error}`);
  }
};
//find a single user
const findSingleService = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ServiceData.findById({ _id: id });
    res.json({ data });
  } catch (error) {
    console.log(`error during find a one user ${error}`);
  }
};
// add products
const addServices = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const dataCheck = new ServiceData(data);
    await dataCheck.save();
    res.json(dataCheck.email);
  } catch (error) {
    console.log(`error during adding a product ${error}`);
    console.log(error);
    res.json(error);
  }
};

/////////////////////////////////

// add to cart items
// add products
const addtocart = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    // const data = await cartadd.find();
    // if(data){
    //   res.json({err:"data exists"});
    // }
    const dataCheck = new cartadd(data);
    await dataCheck.save();
    res.json(dataCheck.email);
  } catch (error) {
    console.log(`error during adding a product ${error}`);
    res.json({err:"err"});
  }
};
// get all the products added to cart
const getallcartSingle = async (req, res) => {
  try {
    const data = await cartadd.find();
    res.json({ data });
  } catch (error) {
    console.log(`error during the getall data`);
  }
};
//remove addto cart single item
const cartSingleRemove= async (req, res) => {
  const { id } = req.params;
  try {
    const userDelete = await cartadd.findByIdAndDelete({ _id: id });
    // console.log(userDelete);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
// find the single data for adding to the cart
const findSingleProductforadd = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findById({ _id: id });
    res.json({ data });
  } catch (error) {
    console.log(`error during find a one user ${error}`);
  }
};
module.exports = {
  signup,
  singin,
  getData,
  deleteUser,
  udpateUser,
  findSingleUser,
  addProduct,
  getProduct,
  deleteProduct,
  udpateProduct,
  findSingleProduct,
  AdminSignIn,
  signupAdmin,
  addServices,
  findSingleService,
  updateServiceData,
  deleteServiceData,
  getserviceData,addtocart,getallcartSingle,cartSingleRemove,findSingleProductforadd
};
