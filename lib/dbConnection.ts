import mongoose from "mongoose";
const DATABASE_URL =process.env.DATABASE_URL;

const dbConnect=async()=>{
    const connectionState=mongoose.connection.readyState;
    if(connectionState===1){
        console.log("Already connected")
        return;
    }

    if(connectionState===2){
        console.log("Connecting...")
        return;
    }

    try{
        mongoose.connect( DATABASE_URL as string)
        console.log("Connected")
    } catch(error){
        console.log("error in connecting to DB",error)
    }

}

export default dbConnect;