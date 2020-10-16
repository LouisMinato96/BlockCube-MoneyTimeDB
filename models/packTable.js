const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const packTable = new Schema({
  packId: {
    type: String,
  },
  userName: {
    type: String,
  },
  startDate: {
    type: String,
  },
  ringLength: {
    type: Number
  },
  sponsorId: {
    type: Array
  },
  endDate: {
    type: String
  },
  status: {
    type: String
  },
  packCode: {
    type: String
  },
  earning: {
    type: Number
  }
});

// Create Modal
const PackModal = mongoose.model("packTable", packTable);

// Export Modal
module.exports = PackModal;