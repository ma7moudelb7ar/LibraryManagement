import TransactionModel from "../DB/models/Transaction.model.js";




export const authorization = (accessRoles) => {
    return (req ,res ,next) => { 
        if (!accessRoles.includes(req?.user?.role)) {
            throw new Error("user not authorized");
        }
        return next()
    }
}


export const authorizeReturn =  async (req ,res ,next) => {
    
    const transactionId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;

    const transaction = await TransactionModel.findById(transactionId);
    if (!transaction) {
        throw new Error("Transaction not found" , {cause : 404});    }

    if (transaction.userId.toString() !== userId.toString() && userRole !== "admin") {
        throw new Error("Forbidden: You cannot return this book" , {cause : 403});    }

    next();
}


export const authorizeOwn = (req, res, next) => {
    const userIdFromToken = req.user._id.toString();
    const userIdFromParams = req.params.id;
  
    if (userIdFromToken !== userIdFromParams) {
      return res.status(403).json({ message: "Forbidden: You can only access your own profile" });
    }
    next();
  };
  