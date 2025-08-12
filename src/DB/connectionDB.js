
import mongoose from "mongoose";


const checkConnectionDB =async ()=> {
    await mongoose.connect(process.env.DB_URL).then(() => {
        console.log("success to connect db.................✌❤ ");
    }).catch((error) => {
        console.log("fail to connect DB ...........🤦‍♂️😒" ,error);
    })
}


export default checkConnectionDB