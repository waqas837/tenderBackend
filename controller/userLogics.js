const { usersignup } = require("../Database/userSchema");
const {PosttenderModel} = require("../Database/TenderSchema")
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
// signup user /tender/poster
const signup = async (req, res) => {
  const data = req.body;
  // console.log(data);
 
  try {
    if(data.password!==data.cpassword){
      res.json({passerr:"passerr"})
    }
       if(data.password===data.cpassword){
        const dataCheck = new usersignup(data);
        await dataCheck.save();
        res.json({userData:dataCheck});
      //   jwt.sign({ email: dataCheck.email }, "thisisthesecretkey", function(err, token) {
      //   res.json({token:token,userData:dataCheck});
      //   console.log(err);
      //  });
       }

  } catch (error) {
    console.log(`error during signup ${error}`);
    // console.log(error);
    res.json(error);
  }
};

//signin tender/poster
const singin = async (req, res) => {
  const { email, password} = req.body;
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
   try {
    const isExists = await usersignup.findOne({email,password});
     if (isExists===null) {
      res.json({ err: "user does not exists" });
    }
    if (isExists !== null) {
       res.json({ success: "true", user: isExists })
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })  
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
      
    }

  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//
const tenderPostData = async (req, res) => {   
   try {
    var data = new PosttenderModel({email:req.body.email,tenderDetail:req.body},)
    await data.save();
    res.json({data})
  
  } catch (error) {
    console.log(`error during tender post the data ${error}`);

  }
}
//show the tender's posted data

const showtenderdata = async (req, res) => {   
  // console.log(req.body)
  try {
    var data = await PosttenderModel.find({email:req.params.email})
    // console.log(data)
    if(data!==null){
      res.json({data})
    }
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);

  }
}

//show the tender's posted data
const showtenderprofile = async (req, res) => {   
  // console.log(req.body)
  try {
    var data = await usersignup.find({email:req.params.email})
    // console.log(data)
    if(data!==null){
      res.json({data})
    }
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);

  }
}
//find data from the embbeded document
const deleteTender = async (req, res) => {  
  const {_id} = req.params
  // console.log(_id)
     try {
        //note: {object formate array.property does not support dirctly,but we can write it inside the 'qoutes'}
        const data = await  PosttenderModel.findOne({'tenderDetail._id':_id })
        // console.log(data)
     
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);

  }
}

//find data from the embbeded document
const getAllteders = async (req, res) => {  
      try {
        //note: {object formate array.property does not support dirctly,but we can write it inside the 'qoutes'}
        const data = await  PosttenderModel.find()
        res.json({data})
     
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);

  }
}
//find data from the embbeded document
const updateProfile = async (req, res) => {  
 
  try {
    //note: {object formate array.property does not support dirctly,but we can write it inside the 'qoutes'}
    const data = await usersignup.findOneAndUpdate({email:req.params.email},req.body,
      {
        new: true
      })
    res.json({data})
 
} catch (error) {
console.log(`error during getting tender's posted data ${error}`);

}
}
//fist bid
const firstbid = async (req, res) => {  
      try {
    // note: {object formate array.property does not support dirctly,but we can write it inside the 'qoutes'}
    const data = await PosttenderModel.findOneAndUpdate({"tenderDetail._id":req.params._id,
      "tenderDetail.bidderemail":{$ne:req.body.bidderemail}},
       {$addToSet:{tenderDetail:{
        bidderemail:req.body.bidderemail,bidderprice:req.body.bidderprice}}},{new:true}) 
        res.json({data})
        console.log(req.body)
  } 
  catch (error) {
  console.log(`error during first bid tender's posted data ${error}`);

}
}
module.exports = {
  signup,
  singin,tenderPostData,showtenderdata,
  showtenderprofile,deleteTender,
  getAllteders,updateProfile,firstbid
};
