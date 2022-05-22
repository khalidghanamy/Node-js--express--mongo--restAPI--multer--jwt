require("./../Models/StudentSchema"); // i require it just to run it // use it only here cause if u used it in another file it will throw error


const mongoose = require('mongoose');
const Student=mongoose.model("students");

module.exports = {
  getAllStudent: (req, res,next) => {

    // req.role=="admin" ? ...:throw Error ("notFound") //authorization
    Student.find({}).populate({path:"department"})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(error); // dont use throw error
      });
  },

  //============================================//

  createStudent: (req, res,next) => {
   

   
    let object = new Student({
      _id: req.body.id,
      name: req.body.name,
      department: req.body.department,
      image:req.file.filename
      
    });

    object
      .save()
      .then((data) => {
        res.status(200).json({ message: "added", data });
      })
      .catch((error) => next(error));
  },

  //============================================//
  updateStudent: (req, res,next) => {

    
    Student.findByIdAndUpdate(req.body.id, {
        _$set: {
            name: req.body.name,
            location: req.body.location,
        },
      
    },{
      new:true
    })
      .then((data) => {
          if(data==null) throw new Error ("Student not found");

        res.status (200).json({ message: "updated", data });
      })
      .catch((error) => next(error));
  },

  //============================================//

  deleteStudent: (req, res,next) => {
      
    Student.findByIdAndDelete(req.body.id)
                        .then(data=>{
                            if(data==null) throw new Error ("Student not found");
                            res.status (200).json({ message: "deleted"});

                        }).catch(error=>next(error));

  },
};


