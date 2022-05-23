const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const body_parser = require('body-parser'); 
const path = require('path');

const departmentRouter=require("./Routers/DepartmentRoute");
const studentRouter = require('./Routers/StudentRoute');
const authRouter = require('./Routers/AuthRoute');


//image variables

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        
        cb(null,path.join(__dirname,"images"))
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toLocaleDateString().replace(/\//g,"-")+""+  file.originalname)
    }

});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype=='image/jpeg'||
       file.mimetype=='image/jpg' ||
       file.mimetype=='image/png' )
        cb(null,true)
        else
        cb(null,false)
}

//create server
const app =express();
//connect to mongo database
mongoose.connect("mongodb://localhost:27017/mongoDatabaseName")
        .then(()=>{
            console.log('dbconnected.... ');
            console.log('connect to server ...');

            // best practice to add server listener here
            app.listen(process.env.PORT||4000,()=>{
                console.log("server is up ..$")
            });
        })
        .catch(error=>{console.log('DB Problem');})



//middlewares------------------------------------->
//first midlleware methode ,url
app.use((req,res,next)=>{
    console.log(req.method,req.url);
    next();
});
// to allow outer fetch
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type,Authorization");

        next();
})
//second midlleware check for authorized person
app.use((req,res,next)=>{

    if(true){
        // console.log("authorized");
        console.log(express);
        next();
    }
    else{
        "NOT authorized"
        next(new Error("not found"))
    }
});

app.use("/images",express.static(path.join(__dirname,"images")))
app.use(multer({storage,fileFilter}).single('image'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));


//-------------------------ROUTES--(End Points)--------------------------//

//login
app.use(authRouter);

app.use(isAuth)
app.use("/department",departmentRouter);
app.use(studentRouter);



//----------------------------------------------------------------------//
//not found midleeware
app.use((req,res)=>{
    console.log(err);
let status=err.status || 500;
    res.status(status).json({data:"not Found"});
});
// middleware errors catcher (4--parameters are mandatory)
app.use((err,req,res,next)=>{   
    console.log(err);         //node understand this is the error handler from parameter number from Js -->function.length
    res.status(500).json({Error:err+""})
});



















