const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

if (process.env.NODE_ENV == "production") {
  __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
}

app.use((req, res, next) => {
  const error = new HttpError("could not find this route", 404);
  throw error;
});
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("running on port ", PORT);
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
