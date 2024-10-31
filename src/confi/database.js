const  mongoose = require("mongoose");

const connectdb = async () => {

   await mongoose.connect("mongodb+srv://redhuyuvraj:yuvraj77@cluster0.j6c5x.mongodb.net/devtinder");
};

module.exports = connectdb;