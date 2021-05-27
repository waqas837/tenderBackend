const mongoose = require("mongoose");
const PostNewtenderSch = new mongoose.Schema({
 
  email: {
    type: String,
    
    required: true,
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

  },
 

  status:{
    type: String,
    required: true,
  }
}); 
 
const PosttenderModel = new mongoose.model("posttender", PostNewtenderSch);
module.exports = { PosttenderModel };