const express = require("express");
const path = require("path");
require("dotenv").config();
require("./db/mongoose");
const userRouter = require("./routes/api/users");
const profileRouter = require("./routes/api/profile");
const authRouter = require("./routes/api/auth");
const postRouter = require("./routes/api/posts");

const app = express();

app.use(express.json());
//Define routes
app.use(userRouter);
app.use(authRouter);
app.use(postRouter);
app.use(profileRouter); 

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
