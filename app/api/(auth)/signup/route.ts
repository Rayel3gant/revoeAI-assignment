import dbConnect from "@/lib/dbConnection"
import User from "@/lib/models/User"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export const POST =async(request:Request)=>{
   try{
      const body=await request.json()
      await dbConnect()

      const { name ,email , password ,gender} =body;
        

      if(!name || !email || !password || !gender){
         return new NextResponse(JSON.stringify({success:false,message:"sign up data missing"}),{status:400})
      }
        

      //search if user already exists
      const searchUserData=await User.findOne({email});
      if(searchUserData){
         return new NextResponse(JSON.stringify({success:false,message:"User already exists!"}),{status:400})
      }

      // Validate password length
      if (password.length < 8) {
         return new NextResponse(JSON.stringify({success:false,message:"Password must be at least 8 characters long",}), { status: 400 });
      }
      
      //hash the password
      const encryptionRounds=10;
      const hashedPassword =await bcrypt.hash(password,encryptionRounds);

      const newUser =await User.create({
         name,
         email,
         password:hashedPassword,
         gender
      })

        return new NextResponse(JSON.stringify({success:true,message:"User signed up",data:newUser}),{status:200})
   } catch(error){
      console.log("error in signup",error)
      return new NextResponse(JSON.stringify({success:false,message:"error in sign up"}),{status:500})
   } 
}