const {Order} = require('../models/order');
const {Product} = require('../models/product');
const {Service} = require('../models/service');
const {Customer} = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const orderList = await Order.find().populate('customerId').populate('orderItems.productId').populate('orderItems.serviceId').populate('orderItems');


    if (!orderList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(orderList);
})

router.get('/:orderId', async (req, res) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
        res.status(404).json({message: 'The order with the given ID was not found!'})
    }

    res.status(200).send(order);
})

router.post('/', async (req, res) => {
    let orderItems = req.body.orderItems.map(item => ({
        productId: item.productId,
        serviceId: item.serviceId,
        quantity: item.quantity,
        taxRate: item.taxRate
    }));

    let order = new Order({
        customerId: req.body.customerId,
        orderDate: req.body.orderDate,
        payment: {
            paymentMethod: req.body.paymentMethod,
            paymentAmount: req.body.paymentAmount,
            gratuityAmount: req.body.gratuityAmount,
            taxAmount: req.body.taxAmount
        },
        discountApplied: req.body.discountApplied,
        orderStatus: req.body.orderStatus,
        orderItems: orderItems,
    });

    
    order = await order.save();

    if (!order)
    return res.status(404).send('the order cannot be created!')

    res.status(200).send(order);
})

router.patch('/:orderId', async (req, res) => {
    const orderItems = req.body.orderItems.map(item => ({
        productId: item.productId,
        serviceId: item.serviceId,
        quantity: item.quantity,
        taxRate: item.taxRate
    }));

    const updatedOrder = {
        customerId: req.body.customerId,
        orderDate: req.body.orderDate,
        payment: {
            paymentMethod: req.body.paymentMethod,
            paymentAmount: req.body.paymentAmount,
            gratuityAmount: req.body.gratuityAmount,
            taxAmount: req.body.taxAmount
        },
        discountApplied: req.body.discountApplied,
        orderStatus: req.body.orderStatus,
        orderItems: orderItems,
    };

    const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        updatedOrder,
        { new: true }
    );

    if (!order)
        return res.status(404).send('The order cannot be updated!');

    res.status(200).send(order);
})

router.delete('/:orderId', (req, res) => {
    Order.findByIdAndRemove(req.params.orderId).then(order => {
        if (order) {
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'order not found!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})
module.exports = router;