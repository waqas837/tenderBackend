const { usersignup } = require("../Database/userSchema");
const {PosttenderModel} = require("../Database/TenderSchema")
var jwt = require('jsonwebtoken');
// signup user /tender/poster
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
    var data = new PosttenderModel({email:req.body.email,tenderDetail:req.body})
    await data.save();
    // console.log(data)
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
    console.log(data)
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
    console.log(data)
    if(data!==null){
      res.json({data})
    }
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);

  }
}
module.exports = {
  signup,
  singin,tenderPostData,showtenderdata,showtenderprofile
};
