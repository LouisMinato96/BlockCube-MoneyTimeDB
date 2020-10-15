const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TicketDetails = new Schema({
    ticketId: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {type: String},
  userName: {type: String},
  status: {type: String},
  earning: {type: String},
  packs: {type: String},
});

// Create Modal
const TicketModal = mongoose.model("ticketDetails", TicketDetails);

// Export Modal
module.exports = TicketModal;