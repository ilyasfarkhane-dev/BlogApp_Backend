require("dotenv/config");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)

  .then(() => {
    console.log("Hello From Database!!!!");
  })
  .catch((err) => {
    console.log(err);
  });
