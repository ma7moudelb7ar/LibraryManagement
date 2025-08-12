import UserModel from "../DB/models/user.model.js";
import { refreshToken } from "../utils/security/index.js";


export const authentication = async (req , res , next) => {
    const {authorization} = req.headers;
    const [prefix , token]= authorization.split(" ") || []
    if (!prefix || !token) {
            
        throw new Error ("token or prefix not found" ,{cause: 404} )
        }
        let signature = ""
        if (prefix == process.env.BEARER_USER) {
        signature =process.env.SIGNATURE_GenretToken_member
            }else if(prefix == process.env.BEARER_ADMIN){
        signature =process.env.SIGNATURE_GenretToken_admin
            }else{
        throw new Error ("Invalid  prefix" ,{cause: 400} )
            }

            const decoded = await refreshToken({token ,  SIGNATURE:signature} )
            if (!decoded?.email) {
                throw new Error ("email not authorized" ,{cause: 400} )
            }
            const user = await UserModel.findOne({email : decoded?.email});
            if (!user) {
                throw new Error ("User not found" ,{cause: 404} )
            }
            
            req.user = user;




    next();
}
