const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sightingSchema = new Schema({
  number: String,
  title: String,
  classification: String,
  timestamp: String,
  location: {
    type: { type: String },
    coordinates: [Number],
  },
});

sightingSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model("Sighting", sightingSchema);