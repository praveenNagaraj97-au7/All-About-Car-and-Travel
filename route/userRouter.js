import { Router } from "express";
import { signUp, deleteAll, login } from "./../controller/userController";

import { preFillLogin, preFillSignUp } from "./../handlers/factoryHandler";
const userRouter = Router();

userRouter.route("/signUp").post(preFillSignUp, signUp);
userRouter.route("/login").post(preFillLogin, login);

userRouter.route("/delete").delete(deleteAll);

module.exports = userRouter;
