// console.log("starting a new project")

const express = require("express");


const app = express();

// app.get("/user/ab*c" , (req,res) => {
//     res.send("getting data from the user:");
// })

// app.post("/user" , (req , res) => {
//     res.get("post the data from the user");
// })

// app.delete("/user" , (req,res) =>{
//     res.delete("delete the data from the database");
// })

// app.use("/user" , (req , res)=> {
//     res.send("mai hi hu");
// });





// Rout handlers

// app.use("/user" ,
//    (req , res , next) =>{
//         console.log("Handling the route 1 ");
//         // res.send("1st response");
//         next();
// },
   

// (req,res) =>{
//     console.log("Handling the route 2");
//     res.send("2nd response");
// });




// app.use("/route" ,route 1 , [route 2 , route 3], route 4 , route 5 )




const {adminauth  , userauth } = require ("./middleware/auth ")

app.use("/admin" , adminauth); 




app.get("/user"  , userauth,  (req , res) =>{
    res.send("this is the data");
})



app.listen(3222 , ()=> {
    console.log("hii i am running ");
});