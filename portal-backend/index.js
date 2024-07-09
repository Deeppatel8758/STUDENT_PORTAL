const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
const indexRoute = require("./routes/index");
const app = express();
dotenv.config({});
const { Sequelize, DataTypes } = require("sequelize");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: process.env.BODY_PARSER_LIMT }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use('/public', express.static('public'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server Started on Port " + PORT);
});

app.use("/routes", indexRoute);

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
