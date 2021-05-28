const express = require("express");
const router = express.Router();
const {
  singin,
  signup,tenderPostData,showtenderdata,showtenderprofile
} = require("./userLogics");
// routes for user account/tender/poster
router.post("/signup", signup);
router.post("/signin", singin);
router.post("/tenderPostData", tenderPostData);
router.get("/showtenderdata/:email", showtenderdata);
router.get("/showtenderprofile/:email", showtenderprofile);

module.exports = router;
