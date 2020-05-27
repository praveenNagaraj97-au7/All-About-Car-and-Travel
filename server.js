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

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Listening On PORT : localhost:${process.env.PORT}`);
});
