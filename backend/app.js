// ורד נגאר 325523017
// מוחמד ריאן 327640835
const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");

const checkAuth = require("./middleware/authMiddleware");
const userRouter = require("./routes/userRoute");
const enemyRouter = require("./routes/enemyRoute");
const buildRouter = require("./routes/buildRoute");
const weaponRouter = require("./routes/weaponRoute");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use("/user", userRouter);
app.use(checkAuth);
app.use("/enemy", enemyRouter);
app.use("/build", buildRouter);
app.use("/weapon", weaponRouter);

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
