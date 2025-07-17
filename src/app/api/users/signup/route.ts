/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import  connect  from "@/dbConfig/dbconfig";

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
       console.log("reqBody", reqBody);
    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
   
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 } // 409 Conflict is more appropriate for duplicate resources
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return success response without sensitive data
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 } // 201 Created for successful resource creation
    );

  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};