
import mongoose from "mongoose";

interface User {
    username:string,
    email:string,
    password:string,
    isVerified?:boolean,
    isAdmin?:boolean,
    forgotPasswordToken?:string,
    forgotPasswordTokenExpiry?:string,
    verifyToken?:string,
    verifyTokenExpiry?:Date
}

const userSchema = new mongoose.Schema<User>({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],       
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:{
        type:String
    },
    verifyTokenExpiry:{
        type:Date
    }

},{timestamps:true})



const User = mongoose.models.users || mongoose.model("user",userSchema);

export default User