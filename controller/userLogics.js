const { usersignup } = require("../Database/userSchema");
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
        jwt.sign({ email: dataCheck.email }, "thisisthesecretkey", function(err, token) {
        res.json({token:token,userData:dataCheck});
        console.log(err);
       });
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
  var {authorization} = req.headers
  const token = authorization.replace("Bearer ", "");
   try {
    const isExists = await usersignup.findOne({email,password});
     if (isExists===null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      jwt.verify(token, 'thisisthesecretkey', function(err, decoded) {
         res.json({ success: "true", user: isExists })  
         if(err){
          res.json({ValidUser:"false"})
         }
      });
      
    }

  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

module.exports = {
  signup,
  singin,
};
