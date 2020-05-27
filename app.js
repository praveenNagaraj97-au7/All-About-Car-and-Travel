import { config } from "dotenv";
config({ path: "./config.env" });

import Express from "express";
import morgan from "morgan";
import { fetchUrl } from "fetch";

import viewRouter from "./route/viewRouter";
import userRouter from "./route/userRouter";

import { errHandler } from "./handlers/errorHandler";

const app = Express();

// app.use(morgan("tiny"));

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.use(viewRouter);
app.use(userRouter);

app.all("*", (req, res, next) => {
  res.render("error/404error", { image });
});

app.use(errHandler);

module.exports = app;
