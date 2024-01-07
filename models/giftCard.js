const mongoose = require('mongoose');

const giftCardSchema = mongoose.Schema({
    activationDate: {
        type: String,
    },
    expirationDate: {
        type: String,
    },
    transactionHistory: [
        {
            type: String,
        }
    ]
});

exports.GiftCard = mongoose.model('GiftCard', giftCardSchema);