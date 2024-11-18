
const jwt = require("jsonwebtoken");

const User = require("../model/user");


const userAuth = async(req , res , next)=> {
   try { 
        // read the token from the requested cookie
        const cookies = req.cookies;
     //    check the token
          const {token } = cookies;
          if(!token){
            throw new Error("Token is not valid");
          }
//    verify the token 
          const decodedObj =   await jwt.verify(token , "DEV@Tinder$790");
          
          const { _id} = decodedObj;
// verify the user
          const user  = await User.findById(_id);
          if(!user){
            throw new Error("User not found");
          }
          res.send(user);
          next();

  }
catch (err){
    res.status(400).send("ERROR" + err.message);
}
};

module.exports = {
    userAuth
}





