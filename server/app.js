const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./utils/errorHandler");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/tasks");
const cors = require("cors");

const app = express();

//middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler.errorHandler);
app.use("/*", errorHandler.notFoundHandler);

module.exports = app;
