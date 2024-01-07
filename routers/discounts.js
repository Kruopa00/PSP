const {Discount} = require('../models/discount');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const discountList = await Discount.find();

    if (!discountList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(discountList);
})

router.get('/:discountId', async (req, res) => {
    const discount = await Discount.findById(req.params.discountId);

    if (!discount) {
        res.status(404).json({message: 'The discount with the given ID was not found!'})
    }

    res.status(200).send(discount);
})

router.post('/', async (req, res) => {
    let discount = new Discount({
        validity: req.body.validity,
        discountPercentage: req.body.discountPercentage,
        discountAmountOff: req.body.discountAmountOff
    })
    discount = await discount.save();

    if (!discount)
    return res.status(404).send('Bad Request from Client')

    res.status(200).send(discount);
})

router.patch('/:discountId', async (req, res) => {
    const discount = await Discount.findByIdAndUpdate(
        req.params.discountId,
        {
            validity: req.body.validity,
            discountPercentage: req.body.discountPercentage,
            discountAmountOff: req.body.discountAmountOff
        },
        { new: true}
    )

    if (!discount)
    return res.status(404).send('Bad Request from Client')

    res.status(200).send(discount);
})

router.delete('/:discountId', (req, res) => {
    Discount.findByIdAndRemove(req.params.discountId).then(discount => {
        if (discount) {
            return res.status(200).json({success: true, message: 'the discount is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'discount not found!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})
module.exports = router;