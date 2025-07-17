/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import  connect  from "@/dbConfig/dbconfig";
import { getDataFromToken } from "@/helper/getDataFromToken";

await connect();

export async function GET(request: NextRequest) {
    try {
        const user:any = await getDataFromToken(request);
        // console.log("user",user);
        const foundUser = await User.findOne({ _id: user.id }).select("-password -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry");   

        console.log("foundUser", foundUser);
        return NextResponse.json({ message: "User found", data: foundUser }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}