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

const userRouter = require("./routes/usersRoute");
const enemiesRouter = require("./routes/enemiesRoute");
const buildsRouter = require("./routes/buildsRoute");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use("/user", userRouter);
app.use("/enemy", enemiesRouter);
app.use("/build", buildsRouter);

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
