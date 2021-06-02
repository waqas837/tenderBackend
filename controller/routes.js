const express = require("express");
const router = express.Router();
  const {
  singin,
  signup,tenderPostData,showtenderdata,
  showtenderprofile,deleteTender,getAllteders,updateProfile,firstbid
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

module.exports = router;
