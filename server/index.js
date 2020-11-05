const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);

require("dotenv").config();

const uri = process.env.MONGODB_URI;

const port = process.env.PORT || 5000;

const Calculations = require("./Calculation");
const mongoose = require("mongoose");

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.static(path.join(__dirname, "..", "client", "build")));

const changeStream = Calculations.watch();

io.on("connection", (client) => {
  // Get the last 10 calculations from the database.
  Calculations.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, calc) => {
      if (err) return console.error(err);

      // Send the last calculations.
      client.emit("calc", calc);
    });

  // Listen for database change and get latest 10 entries.
  changeStream.on("change", () => {
    Calculations.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .exec((err, calc) => {
        if (err) return console.error(err);

        // Send the last calculations.
        client.emit("calc", calc);
      });
  });

  // Listen to connected users for a new calculation.
  client.on("subscribeToCalculation", (calculation) => {
    // Create a calculation.
    const calc = new Calculations({
      calculation: calculation.calculation,
    });

    // Save the calculation to the database.
    calc.save((err) => {
      if (err) {
        return console.error(err);
      }
    });
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

// io.origins("*:*");

http.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
