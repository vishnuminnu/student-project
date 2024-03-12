import  mongoose from "mongoose"


const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
     },
     password:{
        type:String,
        required:true
     },
     branch:{
        type:String,
        required:true
     },
     sem:{
       type:String,
       required:true
     },
     username:{
        type:String,
        required:true,
        unique:true
     },
  
},{timestamps:true});

export default mongoose.model("suser",userSchema)