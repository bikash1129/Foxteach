const mongoose = require("mongoose");
const db = process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error to connect db " + err);
  });