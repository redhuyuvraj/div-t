
const express = require('express');

const connectdb = require("./confi/database");

const app = express();

app.use (express.json());

const User = require("./model/user");

app.use(express.json());

app.post("/signup" , async (req , res ) => {

    const user  = new User(req.body);
    
        await user.save();
        res.send("user added successfully")
});

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


