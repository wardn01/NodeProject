// ורד נגאר 325523017
// מוחמד ריאן 327640835

// Import dependencies
const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");

// Import routes and middleware
const checkAuth = require("./middleware/authMiddleware");
const userRouter = require("./routes/userRoute");
const enemyRouter = require("./routes/enemyRoute");
const buildRouter = require("./routes/buildRoute");
const weaponRouter = require("./routes/weaponRoute");

// Initialize Express app
const app = express();

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS and session middleware
app.use(
  cors({
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Configure session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);

// Register routes with authentication middleware
app.use("/user", userRouter);
app.use(checkAuth);
app.use("/enemy", enemyRouter);
app.use("/build", buildRouter);
app.use("/weapon", weaponRouter);

// Start the server
app.listen(8000, () => console.log("Server running on http://localhost:8000"));
