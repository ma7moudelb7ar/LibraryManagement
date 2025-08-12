import mongoose from "mongoose";


export const userRole = {
    member : "member",
    admin : "admin"
};
const memberSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Name is required"],
        min : [3 , "Name must be at least 3 characters long"],
        max : [20 , "Name must be at most 20 characters long"]
    },
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : true
    },
    password : {
        type : String,
        required : [true , "Password is required"],
        min : [6 , "Password must be at least 6 characters long"],
        max : [20 , "Password must be at most 20 characters long"]
    },
    role : {
        type : String,
        enum : Object.values(userRole),
        default : userRole.member
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    confirmed:{
        type : Boolean,
        default : false
    }
},{
    timestamps : true
});

const UserModel = mongoose.models.User || mongoose.model("User" , memberSchema);
export default UserModel;
