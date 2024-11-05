
const express = require('express');

const connectdb = require("./confi/database");

const app = express();

app.use (express.json());

const User = require("./model/user");

app.use(express.json());

app.post("/signup" , async (req , res ) => {
try{
        console.log(req.body);
        const user  = new User(req.body);
    
        await user.save();
        res.send("user added successfully")}

        catch (error) {
          console.error(error);
          res.status(500).send("An unexpected error occurred");
          }
      
});

// To find the user using email
app.get("/user" , async (req , res) => {

    const userenmail = req.query.email;
    try{   
      const user= await User.find({email : userenmail});
      if(user.length === 0){
        res.status(404).send("user not found");
      }else{
        res.json(user);}
     }
    
     catch(error) {
      console.error(error);
      res.status(400).send("something went wrong");
     }
});

//To find all the users using email
app.get("/feed" , async (req , res) => {

    const useremail = req.query.email;
    try{   
      const feed = await User.find({});
        res.status(200).json(feed);
      }
     
     catch(error){
        res.status(400).send("something went wrong");
     }
})


// to find one user
app.get("/find" , async (req , res) =>{
    const useremail = req.body.email;
    try{
        const find = await User.findOne({email : useremail});
        if(!find){
          returnres.send(404).send("user not found");
        }
        res.status(200).json(find);
    }
    catch{
      res.status(400).send("something went wrong");
    }
})


app.patch("/user/:userId" , async (req, res)=>{
    const userId = req.params.userId;
    const data = req.body;


    try{
      const ALLOWED_UPDATES = ["gender" , "skill" , "photo" , "about"];
      const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

      if(!isUpdateAllowed){
        throw new Error("update is not allowed ");
      }

      if( data.skills && data.skills.length > 40){
        throw new Error(" Sorry! Can't add more skills");
      }

      const updatedUser = await User.findByIdAndUpdate(userId , data , {new:true} );
      if (!updatedUser) {
        return res.status(404).send("User not found");
    }

       res.send("data is updated ");
    }
    catch(err){
      res.status(400).send("something went wrong");
    }

})



app.delete("/user" , async (req , res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete({_id : userId});
    res.send(" user del successfully");
  }
  catch{
    res.status(400).send("id not found");
  }
})

connectdb()
    .then(() =>{
        console.log("database connected successfully");

        // Start the server
        app.listen(3222, () => {
          console.log("hii i a, running ");
        });
    })


    .catch((err) =>{
        console.error("database is not connectd");
    });


