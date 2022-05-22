const mongoose = require('mongoose');


//1-build schema with validations

const schema = new mongoose.Schema({
    _id:Number,// mongoose.Types.objectID
    name:{
        type:String,
        required:true
    },
    location:String
});


//2-register for schema in mongoose

module.exports=mongoose.model("departments",schema);