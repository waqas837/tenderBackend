const mongoose = require("mongoose");
var tenderdetails = new mongoose.Schema({
    selectedFile:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    initialprice:{
        type: String,
        required: true,
    },
    bidderemail:{
         type: String,
      },
    bidderprice:{
        type: String,
    },
    expirytime:{
        type:String,
    },
    expirydate:{
        type:String,
    },
    accepted:{
        type:Boolean, 
        default:false
    },
})
var PostNewtenderSch = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  tenderDetail:[tenderdetails]
}); 
 
const PosttenderModel = new mongoose.model("posttender", PostNewtenderSch);
module.exports = { PosttenderModel };