const express = require("express");
const {body,query,param} = require('express-validator');
const router=express.Router();

const {getAllDepartment,createDepartment,updateDepartment,deleteDepartment} = require('./../Controller/departmentController');

router.get("/list",getAllDepartment);

router.post("/add",[
    
    body("id").isInt().withMessage("dep id should be int"),
    body("name").isAlpha().withMessage("name shouldnt have numbers")
    .custom((value,{req})=>{
        // connect to data base to check data like using findone to check uniqueness
        //Department.findOne({name:value});
    })
   
],createDepartment);

router.put("/update/:id?/:name?",updateDepartment);

router.delete("/delete/:id?",deleteDepartment);


module.exports=router