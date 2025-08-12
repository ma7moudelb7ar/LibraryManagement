import { Router } from "express";
import * as MD from "../../middleware/index.js";
import * as BV from "./Transaction.validation.js";
import * as BS from "./Transaction.service.js";
import { userRole } from "../../DB/models/user.model.js";

const transactionRouter = Router();

transactionRouter.post("/borrowBook" , MD.authentication , MD.validation(BV.borrowBookSchema) , BS.borrowBook);
transactionRouter.put("/returnBook/:id" , MD.authentication , MD.authorizeReturn , MD.validation(BV.returnBookSchema) , BS.returnBook);
transactionRouter.get("/getTransactions" , MD.authentication , MD.authorizeOwn ,BS.getTransactions);
transactionRouter.get("/getTransactions/all" , MD.authentication , MD.authorization([userRole.admin]) ,BS.getAllTransactions);



export default transactionRouter;
