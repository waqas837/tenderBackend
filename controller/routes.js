const express = require("express");
const router = express.Router();
const {
  singin,
  signup, 
} = require("./userLogics");
// routes for user account

router.post("/signup", signup);
router.post("/signin", singin);
 
module.exports = router;
