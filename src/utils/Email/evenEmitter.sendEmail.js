
import { sendEmail } from "../../service/checkEmail.js"
import { generateToken } from "../security/token/index.js"
import { EventEmitter } from "events";

export const eventEmitter = new EventEmitter();

eventEmitter.on("sendEmail" , async (data) => {

    
    
    const {email} = data
const token =  await generateToken({payload : {email} ,SIGNATURE:process.env.SIGNATURE_GenretToken, options :{ expiresIn: 60*2 }  })



    const link = `http://localhost:3000/users/confirmEmail/${token}`

    const isSend  = await sendEmail({
        to:email , 
        html : `<a href="${link}"> click  </a>`
        })

    if (!isSend) {
        throw new Error ("fail to send Email" ,{cause: 400} )

    }
})