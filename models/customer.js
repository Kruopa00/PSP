const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
    },
    contactDetails: {
        type: String,
    },
    loyaltyPoints: {
        type: Number,
    }
});

exports.Customer = mongoose.model('Customer', customerSchema);