import mongoose from "mongoose";

const connectDB = async()=>{
   try{
     const conn = await mongoose.connect("mongodb+srv://vishnuvardhan:vishnuvardhan@cluster0.xh5f3t4.mongodb.net/?retryWrites=true&w=majority")
     console.log("connected to mongodb")
   }catch(error){
    console.log(error)

   }
}

export default connectDB;