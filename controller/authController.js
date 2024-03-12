import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken"
export const registerController=async(req,res)=>{
    try{
       
        const {name,password,branch,sem,username}=req.body;
        if(!name){
            return res.send({message:"Name is Required"})
        }
       
        if(!password){
            return res.send({message:"Password is Required"})
        }
        if(!branch){
            return res.send({message:"branch is Required"})
        }
        if(!sem){
            return res.send({message:"sem is Required"})
        }
        if(!username){
            return res.send({message:"username is Required"})
        }
       
       
       
        //check user
      const exisitingUser = await userModel.findOne({username})

       //exisiting user
       if(exisitingUser){
        return res.status(200).send({
            success:false,
            message:"Already Registerd please login",
        })
       }
    

       //register user
       const hashedPassword =await hashPassword(password);

       //save
       const user = new userModel({name,branch,sem,password:hashedPassword,username}).save();

       res.status(201).send({
        success:true,
        message:"User Register Successfully",
        user,

       })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registeration",
            error
        })
    }  
};

//POST LOGIN
export const loginController =async(req,res)=>{
    try{
        const {username,password}=req.body
        //validation
        if(!username || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({username})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registerd"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
             success:false,
             message:"Invalid Password"
            })
        }
        //token
        const token = await JWT.sign({_id:user._id},"HCHFFMF12345",
            {
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                username:user.username,
                branch:user.branch,
                sem:user.sem,
               
            },
            token,
        });

        

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }  
};


//test controller
export const testController = async(req,res)=>{
    res.send("protected route");

};


