import { Router } from "express";
import * as BS from "./book.service.js";
import * as MD from "../../middleware/index.js";
import * as BV from "./book.validation.js";
import { userRole } from "../../DB/models/user.model.js";
const bookRouter = Router();

bookRouter.post("/addBook" , MD.authentication , MD.authorization([userRole.admin]) , MD.validation(BV.addBookSchema) , BS.addBook);
bookRouter.get("/searchBook" , MD.authentication , BS.searchBook);
bookRouter.put("/updateBook/:id" , MD.authentication , MD.authorization([userRole.admin]) , MD.validation(BV.updateBookSchema) , BS.updateBook);
bookRouter.delete("/deleteBook/:id" , MD.authentication , MD.authorization([userRole.admin]) , MD.validation(BV.deleteBookSchema) , BS.deleteBook);
export default bookRouter;
