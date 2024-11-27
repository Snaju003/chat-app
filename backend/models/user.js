import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilepic:{       
        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User