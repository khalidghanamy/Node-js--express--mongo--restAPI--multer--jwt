const mongoose = require('mongoose');


// //1-build schema with validations

const schema = new mongoose.Schema({

    _id:Number,// mongoose.Types.objectID
    name:{type:String,required:true},
    department:{type:Number,ref:"departments"},
    image:String
});


//2-register for schema in mongoose

mongoose.model("students",schema); 

