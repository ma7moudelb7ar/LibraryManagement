import UserModel, { userRole } from "../../DB/models/user.model.js";
import { eventEmitter } from "../../utils/Email/evenEmitter.sendEmail.js";
import * as SC from "../../utils/security/index.js";


export const signUp= async(req , res ,next )=> {

    const {name , email , password} = req.body;

    // check email is already exists
    if( await UserModel.findOne({email })){
        throw new Error("Email already exists" , {cause : 400});  
    }

    //hash password
    const hashedPassword = await SC.Hash({plainText : password});
    // create user
    const user = await UserModel.create({name , email , password : hashedPassword});
    // send confirmation email
    eventEmitter.emit("sendEmail" , {email})
    
    return res.status(201).json({message : "User created successfully" , user});
}   

export const confirmEmail = async(req , res ,next )=> {
    const {token} = req.params;
    const decoded = await SC.refreshToken({token ,SIGNATURE:process.env.SIGNATURE_GenretToken});

    const user = await UserModel.findOne({email : decoded?.email});
    if (!user) {
        throw new Error("User not found" , {cause : 404});
    }
    user.confirmed = true;
    await user.save();
    return res.status(200).json({message : "User confirmed successfully"});
}

export const signIn = async(req , res ,next )=> {
    const {email , password} = req.body;
    const user = await UserModel.findOne({email});
    if (!user) {
        throw new Error("User not found" , {cause : 404});
    }
    const isMatch = await SC.Compare({plainText : password ,cipherText : user.password});
    if (!isMatch) {
        throw new Error("Invalid password" , {cause : 400});
    }
    const accessToken = await SC.generateToken({payload : { id : user._id ,email} 
        ,SIGNATURE:user.role == userRole.member ? process.env.SIGNATURE_GenretToken_member : process.env.SIGNATURE_GenretToken_admin,
         options :{ expiresIn: "1h" }  })
    const refreshToken = await SC.generateToken({payload : { id : user._id ,email}
        ,SIGNATURE:user.role == userRole.member ? process.env.SIGNATURE_GenretToken_member : process.env.SIGNATURE_GenretToken_admin,
         options :{ expiresIn: "1y" }  })
    return res.status(200).json({message : "User signed in successfully" , accessToken , refreshToken});
}



export const getProfile = async(req , res ,next )=> {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
        throw new Error("User not found" , {cause : 404});
    }
    return res.status(200).json({message : "User profile fetched successfully" , user});
}