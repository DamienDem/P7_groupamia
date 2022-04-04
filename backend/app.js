const express = require("express");
const morgan = require("morgan");
const path = require("path");
const userRoutes = require("./routes/User");
const postRoutes = require("./routes/Post");
const likeRoutes = require("./routes/Like");
const commentRoutes = require("./routes/Comment");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config()


const app = express();
const corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

app
  .use(express.json())
  .use("/images", express.static(path.join(__dirname, "images")))
  .use(express.urlencoded({extended:false}))
  .use(cookieParser())
  .use(morgan("dev"));

app
  .use("/", userRoutes)
  .use("/", postRoutes)
  .use("/", likeRoutes)
  .use("/", commentRoutes);

module.exports = app;
