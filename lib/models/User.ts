import { model, models, Schema } from "mongoose";

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:["Male","Female","Others"]
    },
    token:{
        type:String
    }
},{timestamps:true})


const User= models.User || model("User",userSchema)
export default User