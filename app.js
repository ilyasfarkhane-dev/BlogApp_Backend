require("./db/mongoose");
require("dotenv/config");
const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoute");
const PORT = 3001 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

app.use("/posts", loggingMiddleware, errorHandlingMiddleware, postRouter);
app.use("/users", loggingMiddleware, errorHandlingMiddleware, userRouter);

app.listen(PORT, () => {
  console.log("you are listning on port 3000");
});
