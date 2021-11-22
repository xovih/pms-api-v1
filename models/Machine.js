const mongoose = require("mongoose")

const MachineSchema = new mongoose.Schema(
  {
    sisCode: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
    },
    wcCode: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
    },
    dalCode: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    manufacturer: {
      type: String,
      minlength: 1,
      default: "-",
    },
    capasity: {
      type: Number,
      default: 0,
    },
    sepurCount: {
      type: Number,
      max: 8,
      default: 1,
    },
    location: {
      type: String,
      required: true,
      minLength: 2,
    },
    line: {
      type: String,
      required: true,
      minLength: 2,
      default: "integrated",
    },
    orderNo: {
      type: Number,
      min: 1,
      default: 1,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Machine", MachineSchema)
