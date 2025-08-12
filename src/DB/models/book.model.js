
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , "Title is required"],
        min : [3 , "Title must be at least 3 characters long"],
        max : [100 , "Title must be at most 100 characters long"]
    },
    author : {
        type : String,
        required : [true , "Author is required"],
        min : [3 , "Author must be at least 3 characters long"],
        max : [100 , "Author must be at most 100 characters long"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    
    },
    availableCopies : {
        type : Number,
        default : 1,
        required : [true , "Available copies is required"]
    },
    publishedYear : {
        type : Number,
        default : Date.now,
        required : [true , "Published year is required"]
    }
},{
    timestamps : true
});

const BookModel = mongoose.models.Book || mongoose.model("Book" , bookSchema);
export default BookModel;
