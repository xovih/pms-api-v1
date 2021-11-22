const mongoose = require("mongoose")

const SensorSchema = new mongoose.Schema(
  {
    machine: {
      type: String,
      ref: "Machine",
    },
    sensorStatus: {
      type: Number,
      default: 0,
      min: 0,
      max: 2,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Sensor", SensorSchema)