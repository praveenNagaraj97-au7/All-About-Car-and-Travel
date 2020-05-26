import { connect } from "mongoose";
import { createConnection } from "mysql";

import app from "./app";

// Mongoose Connection
const DB = process.env.MONGODB_CONNECTION.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);

connect(DB, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// SQL DATABASE CONNECTION

const SQL_DB = createConnection({
  host: process.env.SQL_HOST,
  user: "root",
  password: "",
  database: process.env.SQL_DATABASE_NAME,
});

SQL_DB.connect((err) => {
  if (err) {
    // Create DataBase if Not Exists
    SQL_DB.query(
      `CREATE DATABASE ${process.env.SQL_DATABASE_NAME}`,
      (err, result) => {
        if (err) console.log(err);
        else console.log("Data Base Created");
      }
    );
  } else {
    console.log("My SQL DataBase Connected");
  }
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Listening On PORT : localhost:${process.env.PORT}`);
});
