const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
    emailId: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        default: ''
    },
    packId: { 
        type: Array, 
        default: []     // Double Array 
    },
    packCode: { 
        type: Number, 
        default: 0 
    },
    sponsorId: { 
        type: String ,
        default: ''
    },
    spinTicket: { 
        type: String, 
        default: 0 
    },
    userStellarAddress: { 
        type: String,
        default: '' 
    },
    countryCode: { 
        type: Number, 
        default: 0 
    },
    packEarning: { 
        type: Number, 
        default: 0 
    },
    ticketEarning: { 
        type: Number, 
        default: 0 
    },
    ancestorSponsorIds: {
        type: Array,
        default: []
    }
});

// Create Modal
const UserModal = mongoose.model("userDetails", userSchema);

// Export Modal
module.exports = UserModal;