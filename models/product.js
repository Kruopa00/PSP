const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    stockLevel: {
        type: Number,
    },
    category: {
        type: String
    }
});

exports.Product = mongoose.model('Product', productSchema);