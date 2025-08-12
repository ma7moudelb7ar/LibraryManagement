import { Router } from "express";
import* as US from "./user.service.js";
import * as MD from "../../middleware/index.js";
import * as UV from "./user.validation.js";
import { loginLimiter } from "../../utils/security/rateLimiter/rateLimiter.js";

const userRouter = Router();

userRouter.post("/signUp" , MD.validation(UV.SignupSchema), US.signUp);
userRouter.get("/confirmEmail/:token" , US.confirmEmail);
userRouter.post("/signIn" ,loginLimiter, MD.validation(UV.SigninSchema), US.signIn);
userRouter.get("/profile/:id" , MD.authentication ,MD.authorizeOwn ,US.getProfile);
export default userRouter;
