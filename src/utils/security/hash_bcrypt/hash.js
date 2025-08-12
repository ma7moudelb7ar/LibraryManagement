import bcrypt from "bcrypt";

export const Hash = async ({ plainText , SALT_ROUND = process.env.SALT_ROUND  }= { })   => { 
   
    return  await bcrypt.hash(plainText, Number(SALT_ROUND))

}