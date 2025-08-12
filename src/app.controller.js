import checkConnectionDB from "./DB/connectionDB.js";
import bookRouter from "./modules/books/books.controller.js";
import transactionRouter from "./modules/Transaction/Transaction.controller.js";
import userRouter from "./modules/users/user.controller.js";
import { GlobalError } from "./utils/security/error/GlobalError.js";
import expressMongoSanitize from "express-mongo-sanitize";

const bootstrap = (app , express) => {


    app.use(express.json());

    app.use("/users" , userRouter);

    app.use(expressMongoSanitize());
    app.use("/books" , bookRouter);
    app.use("/transactions" , transactionRouter);
    checkConnectionDB();
    app.use("{/demo}" , (req , res) => {
        res.status(404).json({message : `Url not found ${req.originalUrl}`});
    })
    app.use(GlobalError);

    };


export default bootstrap;