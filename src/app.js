
const express = require('express');

const connectdb = require("./confi/database");

const app = express();

const cookieParser = require ("cookie-parser")

const jwt = require("jsonwebtoken")

app.use(express.json()); 

app.use(cookieParser());

const User = require("./model/user");


const { validateSignUpData } = require("./model/validation");

const bcrypt = require('bcrypt');

const { userAuth} = require("./middleware/auth")



app.post("/signup" , async (req , res ) => {
try{

  // validation of data 
  
  // console.log(req.body);
  // const { firstName , lastName ,email ,password} = req.body;
  
  
  validateSignUpData(req);
  
  const {firstName , lastName , email , password , gender} = req.body;
  if (!password) {
    return res.status(400).send("Password is required");
  }
  const passwordHash = await bcrypt.hash(password , 10);
  console.log(passwordHash);

        const user  = new User({
          firstName,
          lastName,
          email,
          password: passwordHash, 
          gender,
        });
    
        await user.save();
        res.send("user added successfully")}

        catch (error) {
          console.error(error);
          res.status(500).send("An unexpected error occurred");
          }
      
});


app.get("/login" , async (req , res) =>{
        try{
          const{email , password} = req.body;
          const user = await User.findOne({  email});
          
          if(!user){
            throw new error ("Invalid Data");
          }
          const isPasswordValid = await user.validatePassword (password );

          if(isPasswordValid){
            //create a JWT token 

            const token = await user.getJWT();

            // res.cookie("token", token, { httpOnly: true });
          

          //add the token to the cookie and send the res back
          res.cookie("token" , token);


            res.send("Login Successfully ");
          }
          else{
            throw new error("Invalid Data");
          }

        }
        catch(error){
          console.error(error);
          res.status(404).send("Error" + error.message);
        }

})


app.get("/profile" , userAuth ,  async(req, res) =>{
   try{
  
  const user = req.user;
  res.send (user); 

   }

   catch(error){
    console.error(error);
        res.status(404).send("Token Invalid")
   }

})



app.post("/sendConnectionRequest" , userAuth , async(req , res) =>{
  const user = req.user;
  console.log("sending the connection request");
  res.send(user.firstName + " is sending the connection request");
})


connectdb()
    .then(() =>{
        console.log("database connected successfully");

        // Start the server
        app.listen(4000, () => {
          console.log("hii i a, running ");
        });
    })


    .catch((err) =>{
        console.error("database is not connected");
    });


