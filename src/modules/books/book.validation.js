
import Joi from "joi";
import { customId, generalRules } from "../../utils/Rules/generalRules.js";

export const addBookSchema = {
    body:
    Joi.object({
    title : Joi.string().min(3).max(100).required(),
    author : Joi.string().min(3).max(100).required(),
    availableCopies : Joi.number().required(),
    publishedYear : Joi.number().required()

})}


export const updateBookSchema = {
    body:
    Joi.object({
    title : Joi.string().min(1).max(100),
    author : Joi.string().min(1).max(100),
    availableCopies : Joi.number(),
    publishedYear : Joi.number(),
}),
    params:
    Joi.object({
    id:Joi.string().custom(customId).required(),
    
})
}

export const deleteBookSchema = {
    params:
    Joi.object({
    id:Joi.string().custom(customId).required(),
    
})}