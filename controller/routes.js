const express = require("express");
const router = express.Router();
  const {
  singin,getSingleTender,getAllBidders,getAllBiddersAndAcceptBid,getmybids,notifytender,
  signup,tenderPostData,showtenderdata,getAllUsers,updateUsers,deleteUsers,deleteAllTendersForSingleUser,
  showtenderprofile,deleteTender,getAllteders,updateProfile,firstbid,adminSignIn,getAsingleUsr
} = require("./userLogics");
// routes for user account/tender/poster
router.post("/signup", signup);
router.post("/signin",singin);
router.post("/tenderPostData",tenderPostData);
router.get("/showtenderdata/:email",showtenderdata);
router.get("/showtenderprofile/:email", showtenderprofile);
router.get("/deleteTender/:_id", deleteTender);
router.get("/getAllteders", getAllteders);
router.put("/updateProfile/:email", updateProfile);
router.post("/firstbid/:_id", firstbid);
router.post("/adminSignIn", adminSignIn);
router.get("/getAllUsers", getAllUsers);
// get a single user then next will update it
router.get("/getAsingleUsr/:id", getAsingleUsr);
// update a single user then next will update it
router.put("/updateUsers/:id", updateUsers);
//  delete user  
router.delete("/deleteUsers/:id", deleteUsers);
// delete all tenders for a single user
router.delete("/deleteAllTendersForSingleUser/:id", deleteAllTendersForSingleUser);
// get a single tender data to be update
router.get("/getSingleTender/:id", getSingleTender);
// get a single tender data  
router.get("/getAllBidders/:id", getAllBidders); 
// accept a bid 
router.post("/accept/:id", getAllBiddersAndAcceptBid); 
//get bids has been accepted for a specific bidder
router.get("/getmybids/:email", getmybids); 
//show notification to tender also
router.get("/notifytender/:email",notifytender ); 
module.exports = router;
