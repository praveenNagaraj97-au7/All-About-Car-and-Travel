import { config } from "dotenv";
config({ path: "./config.env" });

import Express from "express";
import morgan from "morgan";

import { errHandler } from "./handlers/errorHandler";

const app = Express();

// app.use(morgan("tiny"));

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.all("*", (req, res, next) => {
  res.status(404).json({
    message: "page Not Found",
  });
});

app.use(errHandler);

module.exports = app;
