const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const routes = require("./routes/index");
const database = require("./config/database.js");
const ApiError = require("./utils/ApiError");
const { rateLimit } = require("express-rate-limit");
require("dotenv").config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per 15mins.
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

const app = express();
// enable cors

app.use(cors());
app.options("*", cors());

// Apply the rate limiting middleware to all requests.
app.use(limiter);
//  Logging Middleware
app.use(morgan("dev"));

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());

// body parser setup
app.use(express.json());

// main route setup
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "API Route Not found"));
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({ status: 500, message: err.message });
});

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, async () => {
  database;
  console.log(
    chalk.yellowBright.bold(
      `Server is running on PORT: ${PORT}, on mode ${process.env.NODE_ENV}.`
    )
  );
});

// Handle unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(chalk.bold.redBright(`Error: ${err.message}`));
  console.log(err);
  server.close(() => {
    console.log(
      chalk.bold.redBright("Server closed due to unhandled promise rejection")
    );
    process.exit(1);
  });
});

//To create Models : npx sequelize-auto -h kashin.db.elephantsql.com -d vjubsquz -u vjubsquz -x yk-vnsA8m9JfRYtBK6rmMu5PNqZlDTVC -p 5432  --dialect postgres -o model/Locations -t location
