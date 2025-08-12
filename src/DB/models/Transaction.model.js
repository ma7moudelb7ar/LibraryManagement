import mongoose from "mongoose";

export const transactionStatus = {
    borrowed : "borrowed",
    returned : "returned"
}

const transactionSchema = new mongoose.Schema({
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Book"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    borrowDate : {
        type : Date,
        default : Date.now
    },
    returnDate : {
        type : Date,
        default : Date.now
    },
    status : {
        type : String,
        enum : Object.values(transactionStatus),
    }
})

const TransactionModel = mongoose.models.Transaction || mongoose.model("Transaction" , transactionSchema);
export default TransactionModel;
