import { Router } from "express";

import { main, login, signUp } from "./../controller/viewController";

const viewRouter = Router();

viewRouter.route("/").get(main);
viewRouter.route("/login").get(login);
viewRouter.route("/signUp").get(signUp);
module.exports = viewRouter;
