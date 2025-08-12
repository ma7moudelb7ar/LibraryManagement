import BookModel from "../../DB/models/book.model.js";


export const addBook = async(req , res ,next )=> {
    
    const {title , author ,availableCopies , publishedYear} = req.body;

    const book = await BookModel.create({title , author ,availableCopies , publishedYear});
    
    return res.status(201).json({message : "Book added successfully" , book});
}

export const searchBook = async(req , res ,next )=> {

    const { title, author, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (author) {
      filter.author = { $regex: author, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const books = await BookModel.find(filter)
      .skip(skip)
      .limit(Number(limit));

    const total = await BookModel.countDocuments(filter);

    return res.status(200).json({
      message: "Books search results",
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
      books
    });
}


export const updateBook = async(req , res ,next )=> {
    
    const {id} = req.params;
    const {title , author ,availableCopies , publishedYear} = req.body;
    const book = await BookModel.findByIdAndUpdate(id , {title , author ,availableCopies , publishedYear});
    if (!book) {
        throw new Error("Book not found" , {cause : 404});
    }
    return res.status(200).json({message : "Book updated successfully" , book});
}

export const deleteBook = async(req , res ,next )=> {
    
    const {id} = req.params;
    const book = await BookModel.findByIdAndDelete(id);
    if (!book) {
        throw new Error("Book not found" , {cause : 404});
    }
    return res.status(200).json({message : "Book deleted successfully" , book});
}