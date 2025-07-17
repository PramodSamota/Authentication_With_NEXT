/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import  connect  from "@/dbConfig/dbconfig";
import jwt from "jsonwebtoken"

export const POST = async (req: NextRequest) => {
    try {
        await connect();
        const reqBody = await req.json();
        const { email, password } = reqBody;    
        console.log("reqBody", reqBody);
        // Validate required fields
        if (!email || !password) {
          return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
          );
        }
    
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // token data
        const tokenData= {
            id:user._id,
            email:user.email,
            username:user.username,
        }

        //generate token

        const token =  jwt.sign (
            tokenData,
            process.env.TOKEN_SECERT!,
            {expiresIn:"1d"}
        )

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        },{status:200});
        response.cookies.set("token",token,{httpOnly:true});
        return response;

    } catch (error: any) {
        return NextResponse.json({
            error:error.message,
            success:false
        })
    }
}