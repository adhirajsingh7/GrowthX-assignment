require("dotenv").config();
const db_connection = require("./config/db");
const APP_PORT = process.env.APP_PORT || 8080;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const error_handler = require("./middleware/errorHandler");
const session = require("express-session");
const mongodb_store = require("./config/session_db");
const passport = require("passport");
const passport_local_strategy = require("./strategies/local-strategy");

const app = express();

app.use(morgan("tiny"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: mongodb_store,
    cookie: {
      maxAge: 60000 * 60, //1hr
    },
  })
);

// Db connection
db_connection();

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require("./routes"));

// Error handler
app.use(error_handler);

app.listen(APP_PORT, () => {
  console.log(`Server is running on PORT : ${APP_PORT}`);
});
