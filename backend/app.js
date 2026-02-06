const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

const userRouter = require("./routes/userRoute");
const enemyRouter = require("./routes/enemyRoute");
const buildRouter = require("./routes/buildRoute");
const weaponRouter = require("./routes/weaponRoute");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use("/user", userRouter);
app.use("/enemy", enemyRouter);
app.use("/build", buildRouter);
app.use("/weapon", weaponRouter);

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
