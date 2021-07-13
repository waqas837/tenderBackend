const { usersignup } = require("../Database/userSchema");
const { PosttenderModel } = require("../Database/TenderSchema");
const { admin } = require("../Database/Admin");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
// signup user /tender/poster
const signup = async (req, res) => {
  const data = req.body;
  // console.log(data);

  try {
    if (data.password !== data.cpassword) {
      res.json({ passerr: "passerr" });
    }
    if (data.password === data.cpassword) {
      const dataCheck = new usersignup(data);
      await dataCheck.save();
      res.json({ userData: dataCheck });
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
  const { email, password } = req.body;
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  try {
    const isExists = await usersignup.findOne({ email, password });
    if (isExists === null) {
      res.json({ err: "user does not exists" });
    }
    if (isExists !== null) {
      res.json({ success: "true", user: isExists });
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
    var data = new PosttenderModel({
      email: req.body.email,
      tenderDetail: req.body,
    });
    await data.save();
    res.json({ data });
  } catch (error) {
    console.log(`error during tender post the data ${error}`);
  }
};
//show the tender's posted data

const showtenderdata = async (req, res) => {
  // console.log(req.body)
  try {
    var data = await PosttenderModel.find({ email: req.params.email });
    // console.log(data)
    if (data !== null) {
      res.json({ data });
    }
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);
  }
};

//show the tender's posted data
const showtenderprofile = async (req, res) => {
  // console.log(req.body)
  try {
    var data = await usersignup.find({ email: req.params.email });
    // console.log(data)
    if (data !== null) {
      res.json({ data });
    }
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);
  }
};
//find data from the embbeded document
const deleteTender = async (req, res) => {
  const { _id } = req.params;
  // console.log(_id)
  try {
    //note: {object formate array.property does not support dirctly,but we can write it inside the 'qoutes'}
    const data = await PosttenderModel.findOne({ "tenderDetail._id": _id });
    // console.log(data)
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);
  }
};

//find data from the embbeded document
const getAllteders = async (req, res) => {
  try {
    //note: {object formate array.property does not support dirctly,but we can write it inside the 'qoutes'}
    const data = await PosttenderModel.find();
    res.json({ data });
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);
  }
};
//find data from the embbeded document
const updateProfile = async (req, res) => {
  try {
     const data = await usersignup.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      {
        new: true,
      }
    );
    res.json({ data });
  } catch (error) {
    console.log(`error during getting tender's posted data ${error}`);
  }
};
//fist bid
const firstbid = async (req, res) => {
  try {
    // note: {object formate array.property does not support dirctly,but we can write it inside the 'qoutes'}
    const data = await PosttenderModel.findOneAndUpdate(
      {
        "tenderDetail._id": req.params._id,
        "tenderDetail.bidderemail": { $ne: req.body.bidderemail },
      },
      {
        $addToSet: {
          tenderDetail: {
            bidderemail: req.body.bidderemail,
            bidderprice: req.body.bidderprice,
          },
        },
      },
      { new: true }
    );
    res.json({ data });
    console.log(req.body);
  } catch (error) {
    console.log(`error during first bid tender's posted data ${error}`);
  }
};

//adminSignIn
const adminSignIn = async (req, res) => {
  const { email, password } = req.body;
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  console.log(email, password);
  try {
    const isExists = await admin.findOne({ email, password });
    if (isExists === null) {
      res.json({ err: "admin does not exists" });
    }
    if (isExists !== null) {
      res.json({ success: "true", user: isExists });
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
    }
  } catch (error) {
    console.log(`error during sigin of admin ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//getAllUsers for admin
const getAllUsers = async (req, res) => {
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  try {
    const isExists = await usersignup.find();
    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true", user: isExists });
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
    }
  } catch (error) {
    console.log(`error during sigin of admin ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//getA singleUsr then next we will edit it
const getAsingleUsr = async (req, res) => {
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  try {
    const isExists = await usersignup.findById({ _id: req.params.id });
    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true", user: isExists });
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
    }
  } catch (error) {
    console.log(`error during get a single record of the users ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//udpate a singleUsr
const updateUsers = async (req, res) => {
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  try {
    const isExists = await usersignup.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true", user: isExists });
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
    }
  } catch (error) {
    console.log(`error during update a single record of the users ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//delete a singleUsr
const deleteUsers = async (req, res) => {
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  try {
    const isExists = await usersignup.findByIdAndDelete({ _id: req.params.id });
    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true", user: isExists });
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
    }
  } catch (error) {
    console.log(`error during update a single record of the users ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//delete a singleUsr all tenders
const deleteAllTendersForSingleUser = async (req, res) => {
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  console.log(req.params.id);
  try {
    const isExists = await PosttenderModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ status: "deleted", success: "true", user: isExists });
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
    }
  } catch (error) {
    console.log(`error during update a single record of the users ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
//getSingleTender
const getSingleTender = async (req, res) => {
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  console.log(req.params.id);
  try {
    const isExists = await PosttenderModel.findById({ _id: req.params.id });
    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true", user: isExists });
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
    }
  } catch (error) {
    console.log(`error during update a single record of the users ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//get getAllBidders byid
const getAllBidders = async (req, res) => {
  console.log(req.params.id);
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");

  try {
    const isExists = await PosttenderModel.findOne({
      "tenderDetail._id": req.params.id,
    });

   
    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true", user: isExists });
      // jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
      //    res.json({ success: "true", user: isExists })
      //    if(err){
      //     res.json({ValidUser:"false"})
      //    }
      // });
    }
  } catch (error) {
    console.log(`error during getting bidders by id ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//get getAllBidders by ID and accept true/false
const getAllBiddersAndAcceptBid = async (req, res) => {
  try {
    const isExists = await PosttenderModel.findOneAndUpdate(
      { "tenderDetail._id": req.params.id },
      { $set: { "tenderDetail.$.accepted": req.body.accepted } },
      { new: true }
    );

    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true", data: isExists });
    }
  } catch (error) {
    console.log(
      `error during update a single record of the accept bidd ${error}`
    );
    console.log(error);
    // res.json({err:error});
  }
};

// getmybids
const getmybids = async (req, res) => {
  // var {authorization} = req.headers
  // const token = authorization.replace("Bearer ", "");
  
  const user = req.params.email;
  try {
    //find(filter,data)
    //aggregate($match) is same as find(filter)
    //$elemMatch grips direct to the array of this document
    //so we can group any field as new field and we can just finding only one expression as distinct/unique values
    //aggregate has different stages these stages are like the pipelines next to next and we can make some new groups and
    //amazing things +project stage will include or exlude the fields like filters
    //so how to use the elemMatch but we first write the array
    // const isExists =
    // await PosttenderModel.find({"tenderDetail.bidderemail":user})
    const isExists = await PosttenderModel.find(
      { "tenderDetail.bidderemail": user, "tenderDetail.accepted": true },
      { tenderDetail: { $elemMatch: { bidderemail: user } } }
    ).select("email");

    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true", data: isExists });
    }
  } catch (error) {
    console.log(`error during se a single record of the accept bidd ${error}`);
    res.json({ error });
    // res.json({err:error});
  }
};

// notifytender
const notifytender = async (req, res) => {
  const user = req.params.email;
  try {
    const isExists = await PosttenderModel.find({email:user}).select("tenderDetail")


    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true", data: isExists });
    }
  } catch (error) {
    console.log(`error during notifying tender ${error}`);
    res.json({ error });
    // res.json({err:error});
  }
};

// getting tenders by only email
const showTendersForSingleTender = async (req, res) => {
  const user = req.params.email;
  try {
    const isExists = await PosttenderModel.aggregate([{$match:{email:user}}
      ,{$group:{_id:"$tenderDetail.title"}}])

 
    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true",email:user , data: isExists });
    }
  } catch (error) {
    console.log(`error during notifying tender ${error}`);
    res.json({ error });
    // res.json({err:error});
  }
};

// getting tenders by only email
const getRequired = async (req, res) => {
  const user = req.params.email;
  const title = req.params.title;
  
  try {
    const isExists = await PosttenderModel.findOne({email:user,"tenderDetail.title":title},)
 
    if (isExists === null) {
      res.json({ err: "something is not good" });
    }
    if (isExists !== null) {
      res.json({ success: "true",email:user , data: isExists });
    }
  } catch (error) {
    console.log(`error during finding one sinlge tender ${error}`);
    res.json({ error });
    // res.json({err:error});
  }
};




module.exports = {
  signup,
  getAllBidders,
  getmybids,
  notifytender,
  singin,
  tenderPostData,
  showtenderdata,
  deleteUsers,
  showtenderprofile,
  deleteTender,
  getSingleTender,
  getAllBiddersAndAcceptBid,
  getAllteders,
  updateProfile,
  firstbid,
  adminSignIn,
  getAllUsers,
  getAsingleUsr,
  updateUsers,
  deleteAllTendersForSingleUser,
  showTendersForSingleTender,getRequired
};
