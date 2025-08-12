import Joi from "joi";
import { generalRules } from "../../utils/Rules/generalRules.js";

export const SignupSchema = {
    body :  
    Joi.object({
    name : Joi.string().required().min(3).max(20),
    email : generalRules.email,
    password : generalRules.password,
    confirmPassword : Joi.string().required().valid(Joi.ref("password")),   
})}

export const SigninSchema = {
    body :  
    Joi.object({
    email : generalRules.email,
    password : generalRules.password,
})}

