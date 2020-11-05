const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema(
  {
    calculation: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Calculations", calculationSchema);
