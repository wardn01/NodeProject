const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/usersRoute");
const enemiesRouter = require("./routes/enemiesRoute");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use("/user", userRouter);
app.use("/enemies", enemiesRouter);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
