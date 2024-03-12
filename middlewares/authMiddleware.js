import  Jwt  from "jsonwebtoken";


//protected routes token base

export const requireSinIn = async(req,res,next)=>{
    try{
        const decode = Jwt.verify(req.headers.authorization,"HCHFFMF12345" )
        req.user=decode;
    next()
    }catch(error){
    console.log(error)
    }
};
