import BookModel from "../../DB/models/book.model.js";
import TransactionModel, { transactionStatus } from "../../DB/models/Transaction.model.js";


export const borrowBook = async(req , res ,next )=> {

    const userId = req.user._id; 
    const { bookId } = req.body;

    const book = await BookModel.findById(bookId);
    if (!book) {
      throw new Error("Book not found" , {cause : 404});
    }
    if (book.availableCopies <= 0) {
      throw new Error("Book is not available" , {cause : 400});
    }

    const transaction = await TransactionModel.create({
      bookId,
      userId,
      status: transactionStatus.borrowed,
      borrowDate: new Date(),
    });

    book.availableCopies -= 1;
    await book.save();

    return res.status(201).json({ message: "Book borrowed successfully", transaction });;
}


export const returnBook = async(req , res ,next )=> {
    const transactionId = req.params.id;

    const transaction = await TransactionModel.findById(transactionId);
    if (!transaction) {
      throw new Error("Transaction not found" , {cause : 404});
    }


    if (transaction.status == transactionStatus.returned) {
      throw new Error("Book already returned" , {cause : 400});
    }

    const book = await BookModel.findById(transaction.bookId);
    if (!book) {
      throw new Error("Book not found" , {cause : 404});
    }
    transaction.status = transactionStatus.returned;
    transaction.returnDate = new Date();
    await transaction.save();
    book.availableCopies += 1;
    await book.save();

    return res.status(200).json({ message: "Book returned successfully", transaction });
}

export const getTransactions = async(req , res ,next )=> {
    const userId = req.user._id; 

    const transactions = await TransactionModel.find({ userId })
      .populate("bookId"); 

    return res.status(200).json({
      message: "User transactions fetched successfully",
      transactions,
    });
}

export const getAllTransactions = async(req , res ,next )=> {
    const { status, sortByBorrowDate } = req.query;

    const filter = {};
    if (status) {

      const allowedStatuses = Object.values(transactionStatus);
      if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status filter" , {cause : 400});
      }
      filter.status = status;
    }


    let sortOption = {};
    if (sortByBorrowDate) {
      if (!["asc", "desc"].includes(sortByBorrowDate.toLowerCase())) {
        throw new Error("sortByBorrowDate must be 'asc' or 'desc'" , {cause : 400});
      }
      sortOption.borrowDate = sortByBorrowDate.toLowerCase() === "asc" ? 1 : -1;
    }

    const transactions = await TransactionModel.find(filter)
      .sort(sortOption)
      .populate("userId", "name email")
      .populate("bookId", "title author");

    return res.status(200).json({
      message: "Filtered and sorted transactions fetched successfully",
      transactions,
    });
}
