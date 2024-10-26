
 adminauth = require = (req , res , next)=> 
    { const token = "xyz";
    const isauthenticated = token ==="xyz";

    if (isauthenticated){
        res.send("data is send");
    }
    else{
        res.send(401).send("unknown user");
    }
}

userauth = require = (req , res , next)=> 
    { const token = "xyz";
    const isauthenticated = token ==="xyz";

    if (isauthenticated){
        res.send("data is send");
    }
    else{
        res.send(401).send("unknown user");
    }
}

module.exports = {
    adminauth,userauth,
}





