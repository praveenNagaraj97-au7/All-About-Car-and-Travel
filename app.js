import { config } from "dotenv";
config({ path: "./config.env" });

import viewRouter from "./route/viewRouter";

import Express from "express";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.use(viewRouter);

module.exports = app;
