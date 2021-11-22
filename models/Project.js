const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
  {
    lotNo: {
      type: String,
      required: true,
      minlength: 1,
    },
    qty: {
      type: Number,
      default: 0,
    },
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine"
    },
    sepurNo: {
      type: Number,
      default: 1,
      min: 1,
      max: 4,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Project", ProjectSchema)