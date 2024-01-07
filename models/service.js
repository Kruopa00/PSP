const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
    },
    duration: {
        type: Number,
    },
    price: {
        type: Number,
    },
    category: {
        type: String
    },
});

exports.Service = mongoose.model('Service', serviceSchema);