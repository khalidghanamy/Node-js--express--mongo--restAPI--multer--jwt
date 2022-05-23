const { validationResult } = require("express-validator");
require("./../Models/DepartmentSchema");

const mongoose = require('mongoose');
const Department = mongoose.model('departments');

module.exports = {
  getAllDepartment: (req, res) => {
    Department.find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(error); // dont use throw error
      });
  },

  //============================================//

  createDepartment: (req, res,next) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      error.message = errors
        .array()
        .reduce((current, Object) => current + Object.msg + " ", " ");
      throw error;
    }

    let object = new Department({
      _id: req.body.id,
      name: req.body.name,
      location: req.body.location,
    });

    object
      .save()
      .then((data) => {
        res.status(200).json({ message: "added", data });
      })
      .catch((error) => next(error));
  },
  //============================================//
   updateDepartment:  (req, res,next) => {
   
    Department.findByIdAndUpdate(req.body._id, {
      
      _$set: {
            name: req.body.name,
            location: req.body.location,
        },
      
    },{
      new:true
    })
      .then((data) => {
        
          if(data==null) throw new Error ("department not found");

        res.status (200).json({ message: "updated", data });
      })
      .catch((error) => next(error));
  },

  //============================================//

  deleteDepartment: (req, res,next) => {
      
    Department.findByIdAndDelete(req.body.id)
                        .then(data=>{
                            if(data==null) throw new Error ("department not found");
                            res.status (200).json({ message: "deleted"});

                        }).catch(error=>next(error));

  },
};


