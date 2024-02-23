const express = require("express");
const app = express();
const loggingMiddleware = require("./middleware/loggingMiddleware");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
const loginRouter = require('./routes/loginRoute')

const postRouter = require("./routes/postRoutes");
app.use(express.json());

app.use("/posts", loggingMiddleware, errorHandlingMiddleware, postRouter);
app.use('/login',loginRouter)

app.listen(3001, () => {
  console.log("you are listning on port 3001");
});
