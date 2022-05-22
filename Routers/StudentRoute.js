const express = require('express');

const {getAllStudent,createStudent,updateStudent, } = require('./../Controller/StudentController');

const isAuth =require('./../Middleware/authMW');


const router = express.Router();



router.route("/students")
.get(getAllStudent)
.post(createStudent)


module.exports=router