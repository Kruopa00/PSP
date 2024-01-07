const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    orderDate: {
        type: String,
    },
    payment: {
        paymentMethod: {
            type: Number,
        },
        paymentAmount: {
            type: Number,
        },
        gratuityAmount: {
            type: Number,
        },
        taxAmount: {
            type: Number,
        },
    },
    discountApplied: {
        type: Number
    },
    orderStatus: {
        type: Number
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            serviceId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service"
            },
            quantity: {
                type: Number,
            },
            taxRate: {
                type: Number,
            },
        }
    ],
});

exports.Order = mongoose.model('Order', orderSchema);