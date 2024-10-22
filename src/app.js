// console.log("starting a new project")

const express = require("express");


const app = express();

app.get("/user" , (req,res) => {
    res.send("getting data from the user:");
})

app.post("/user" , (req , res) => {
    res.get("post the data from the user");
})

app.delete("/user" , (req,res) =>{
    res.delete("delete the data from the database");
})

app.use("/user" , (req , res)=> {
    res.send("mai hi hu");
});


app.listen(3222 , ()=> {
    console.log("hii i am running ");
});