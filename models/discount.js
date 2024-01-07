const mongoose = require('mongoose');

const discountSchema = mongoose.Schema({
    validity: [
        {
            type: String
        }
    ],
    discountPercentage: {
        type: Number,
    },
    discountAmountOff: {
        type: Number,
    }
});

exports.Discount = mongoose.model('Discount', discountSchema);