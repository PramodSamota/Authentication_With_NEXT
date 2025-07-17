/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ""
        // console.log("token",token)
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECERT!)
        // console.log("decodedTokne",decodedToken)
        return decodedToken
    } catch (error:any) {
        throw new Error(error.message)
    }
}