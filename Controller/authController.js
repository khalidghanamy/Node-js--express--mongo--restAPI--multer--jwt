const mongoose = require('mongoose');

const Student=mongoose.model("students");


const jwt = require('jsonwebtoken');



module.exports={
login:(req,res,next)=>{
    Student.findOne({name:req.body.name})
    .then((data) => {
        if(!data){
            next(new Error("username or password incorrect"));
        }

        let token=jwt.sign({
            //email:req.body.email
            name:req.body.name,
            role:"student"
        },
        "itiostrack" ,
        {expiresIn:"1h"}
         );

        res.status(200).json({data,token});
        
    }).catch((err) => {
        next(err)
    });
}}


