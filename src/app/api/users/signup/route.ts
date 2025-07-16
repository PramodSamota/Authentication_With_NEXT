import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";



export const POST = async(req:NextRequest,res:NextResponse) =>{
    try {
        const reqBody = await req.json();
        console.log("reqBody",reqBody)
        const {username,email,password} = reqBody;
     
        //check if user already present
       const user = await User.findOne({email});

       if(user){
        return res.json({message:"user is already present"},{status:400});
       }


       //hash password

       const hashedPassword = await bcrypt.hash(password,10);

       const newUser = await User.create({
        username,
        email,
        password:hashedPassword
       })

       res.json({message:"user create successfully", success:true, newUser})

    } catch (error:any) {
        return res.json({error:error.message},{status:500})
    }
}