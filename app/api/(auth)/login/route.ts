import dbConnect from "@/lib/dbConnection";
import User from "@/lib/models/User";
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const POST =async(request:Request)=>{
    try{
        const body=await request.json()
        await dbConnect()

        const { email , password } =body;
        

        if( !email || !password){
            return new NextResponse(JSON.stringify({success:false,message:"login credentials missing"}),{status:400})
        }

        const userData =await User.findOne({email})

        if(!userData){
            return new NextResponse(JSON.stringify({success:false,message:"User not found"}),{status:401})
        }

        //match passwords  => create jwt

        if(await bcrypt.compare(password ,userData.password)){

            const payload={
                email:userData.email,
                id:userData._id,
            }
            const token =jwt.sign(payload,process.env.JWT_KEY!,{
                expiresIn:"1m"
            })

            userData.token=token;
            userData.password="";

            return new NextResponse(JSON.stringify({success:true,message:"User logged in",data:userData}),{status:200})
        } else {
            return new NextResponse(JSON.stringify({success:false,message:"incorrect password"}),{status:400})
        }  
           
    } catch(error){
        console.log("error in login",error)
        return new NextResponse(JSON.stringify({success:false,message:"error in login"}) ,{status:500})
    }
}