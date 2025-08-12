import Joi from "joi";
import { customId } from "../../utils/Rules/generalRules.js";


export const borrowBookSchema = {
    body:
    Joi.object({
    bookId : Joi.string().custom(customId).required(),
    })}


export const returnBookSchema = {
    params:
    Joi.object({
    id:Joi.string().custom(customId).required(),
    })} 