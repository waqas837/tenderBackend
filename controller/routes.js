const express = require("express");
const router = express.Router();
const {
  singin,
  signup, 
  getData,
  deleteUser,
  udpateUser,
  findSingleUser,
  addProduct,
  getProduct,
  deleteProduct,findSingleProduct,udpateProduct,AdminSignIn,signupAdmin,
  addServices,deleteServiceData,findSingleService,getserviceData,updateServiceData,
  addtocart,getallcartSingle,findSingleProductforadd,cartSingleRemove
} = require("./userLogics");
// routes for user account

router.post("/signup", signup);
router.post("/signin", singin);
router.get("/getData", getData);
router.delete("/deleteUser/:id", deleteUser);
router.put("/udpateUser/:id", udpateUser);
router.get("/findSingleUser/:id", findSingleUser);
// routes for the productPanel
router.post("/addProduct", addProduct);
router.get("/getProduct", getProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/findSingleProduct/:id", findSingleProduct);
router.put("/udpateProduct/:id", udpateProduct);
// routes for admin account
router.post("/signupadmin", signupAdmin);
router.post("/signinadmin", AdminSignIn);
// routes for the admin services 
router.post("/addservice", addServices);
router.get("/getServices", getserviceData);
router.delete("/deleteservice/:id", deleteServiceData);
router.get("/findSingleservice/:id", findSingleService);
router.put("/udpateservice/:id", updateServiceData);
// routes for the addtocart user
router.post("/findSingleProductforadd/:id",findSingleProductforadd);
router.post("/addtocartSingle",addtocart);
router.get("/getallcartSingle",getallcartSingle);
router.delete("/cartSingleRemove/:id",cartSingleRemove);
module.exports = router;
