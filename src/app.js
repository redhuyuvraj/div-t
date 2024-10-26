

const express = require("express");


const app = express();

app.get("/getusserdata" , (req, res) =>{
    throw new Error("fvnskjdvnovn");
    res.send("sending the user data");
})


app.use("/" , (err , req , res , next ) =>{
    if (err){
        req.status(505).send("something went wrong");
    }
    
});



app.listen(3222 , ()=> {
    console.log("hii i am running ");
});