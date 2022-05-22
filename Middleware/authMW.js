const jwt = require('jsonwebtoken');


module.exports=(req,res,next)=>{
let token,decode;
    try{
        token=req.get('Authorization').split(" ")[1];
        decode= jwt.verify(token,'itiostrack')
        }catch(error){

            error.message="not authorized"
            error.status=403
            next(error)
        }

        if(decode!==undefined){
            req.role=token.role
            next();
        }
}