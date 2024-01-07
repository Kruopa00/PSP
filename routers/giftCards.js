const {GiftCard} = require('../models/giftCard');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const giftCardList = await GiftCard.find();

    if (!giftCardList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(giftCardList);
})

router.get('/:giftCardId', async (req, res) => {
    const giftCard = await GiftCard.findById(req.params.giftCardId);

    if (!giftCard) {
        res.status(404).json({message: 'The giftCard with the given ID was not found!'})
    }

    res.status(200).send(giftCard);
})

router.post('/', async (req, res) => {
    let giftCard = new GiftCard({
        activationDate: req.body.activationDate,
        expirationDate: req.body.expirationDate,
        transactionHistory: req.body.transactionHistory
    })
    giftCard = await giftCard.save();

    if (!giftCard)
    return res.status(404).send('Bad Request from Client')

    res.status(200).send(giftCard);
})

router.patch('/:giftCardId', async (req, res) => {
    const giftCard = await GiftCard.findByIdAndUpdate(
        req.params.giftCardId,
        {
            activationDate: req.body.activationDate,
            expirationDate: req.body.expirationDate,
            transactionHistory: req.body.transactionHistory
        },
        { new: true}
    )

    if (!giftCard)
    return res.status(404).send('Bad Request from Client')

    res.status(200).send(giftCard);
})

router.delete('/:giftCardId', (req, res) => {
    GiftCard.findByIdAndRemove(req.params.giftCardId).then(giftCard => {
        if (giftCard) {
            return res.status(200).json({success: true, message: 'the gift card is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'gift card not found!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})
module.exports = router;