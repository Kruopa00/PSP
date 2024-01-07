const {Customer} = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const customerList = await Customer.find();

    if (!customerList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(customerList);
})

router.get('/:customerId', async (req, res) => {
    const customer = await Customer.findById(req.params.customerId);

    if (!customer) {
        res.status(404).json({message: 'The customer with the given ID was not found!'})
    }

    res.status(200).send(customer);
})

router.post('/', async (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        contactDetails: req.body.contactDetails,
        loyaltyPoints: req.body.loyaltyPoints
    })
    customer = await customer.save();

    if (!customer)
    return res.status(404).send('the customer cannot be created!')

    res.status(200).send(customer);
})

router.patch('/:customerId', async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
        req.params.customerId,
        {
            name: req.body.name,
            contactDetails: req.body.contactDetails,
            loyaltyPoints: req.body.loyaltyPoints
        },
        { new: true}
    )

    if (!customer)
    return res.status(404).send('the customer cannot be created!')

    res.status(200).send(customer);
})

router.delete('/:customerId', (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId).then(customer => {
        if (customer) {
            return res.status(200).json({success: true, message: 'the customer is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'customer not found!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})
module.exports = router;