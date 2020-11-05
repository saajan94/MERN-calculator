const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);

// const uri = process.env.MONGODB_URI;
const uri =
  "mongodb+srv://admin:admin@cluster0.mbthh.mongodb.net/Calculations?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

const Calculations = require("./Calculation");
const mongoose = require("mongoose");

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.static(path.join(__dirname, "..", "client", "build")));

io.on("connection", (client) => {
  // Get the last 10 calculations from the database.
  Calculations.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, calculations) => {
      if (err) return console.error(err);

      // Send the last calculations.
      client.emit("calculations", calculations);
      // console.log(calculations);
    });

  // Listen to connected users for a new calculation.
  client.on("subscribeToCalculation", (calculation) => {
    // Create a calculation.
    const calc = new Calculations({
      calculation: calculation.calculation,
    });

    // Save the calculation to the database.
    calc.save((err) => {
      if (err) return console.error(err);
    });

    Calculations.watch().on("change", (change) => {
      console.log("Something has changed");
      io.to(change.calculations).emit("changes", change.calculation);
    });

    // client.emit("new-calculation", calculation);
    client.broadcast.emit("calculations", calculation);
    Calculations.find().sort({ createdAt: -1 }).limit(10);
    console.log(calculation);
  });
});

const allowedOrigins = "*:*";

io.origins("*:*");
// io(server, { origins: allowedOrigins });
// io.listen(port);

http.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// const express = require("express");
// const app = express();
// // const http = require("http").Server(app);
// const path = require("path");
// const io = require("socket.io")();
// const Calculations = require("./Calculation");
// const mongoose = require("mongoose");

// // const uri = process.env.MONGODB_URI;
// const uri =
//   "mongodb+srv://admin:admin@cluster0.mbthh.mongodb.net/Calculations?retryWrites=true&w=majority";

// mongoose.connect(uri, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// app.use(express.static(path.join(__dirname, "..", "client", "build")));

// io.on("connection", (client) => {
//   Calculations.find()
//     .sort({ createdAt: -1 })
//     .limit(10)
//     .exec((err, calculations) => {
//       if (err) return console.error(err);

//       // Send the last calculations.
//       client.emit("init", calculations);
//       console.log(calculations);
//     });

//   client.on("subscribeToCalculation", (calculation) => {
//     const calc = new Calculations({
//       calculation: calculation.calculation,
//     });

//     calc.save((err) => {
//       if (err) return console.error(err);
//     });
//     console.log("client is subscribing to get updates of calculator");
//     console.log(calculation);
//     client.broadcast.emit("calculation", calculation);
//   });
// });

// const allowedOrigins = "*:*";

// const port = process.env.PORT || 5000;
// io.origins("*:*");
// //io(server,{origins:allowedOrigins});
// io.listen(port);
// console.log("Listening on port ", port);
