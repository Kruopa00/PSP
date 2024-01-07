const {TaxSetting} = require('../models/taxSetting');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const taxSettingList = await TaxSetting.find();

    if (!taxSettingList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(taxSettingList);
})

router.get('/:taxSettingId', async (req, res) => {
    const taxSetting = await TaxSetting.findById(req.params.taxSettingId);

    if (!taxSetting) {
        res.status(404).json({message: 'The tax setting with the given ID was not found!'})
    }

    res.status(200).send(taxSetting);
})

router.post('/', async (req, res) => {
    let taxSetting = new TaxSetting({
        applicableCategories: req.body.applicableCategories,
        taxPercentage: req.body.taxPercentage
    })
    taxSetting = await taxSetting.save();

    if (!taxSetting)
    return res.status(404).send('Bad Request from Client')

    res.status(200).send(taxSetting);
})

router.patch('/:taxSettingId', async (req, res) => {
    const taxSetting = await TaxSetting.findByIdAndUpdate(
        req.params.taxSettingId,
        {
            applicableCategories: req.body.applicableCategories,
            taxPercentage: req.body.taxPercentage
        },
        { new: true}
    )

    if (!taxSetting)
    return res.status(404).send('Bad Request from Client')

    res.status(200).send(taxSetting);
})

router.delete('/:taxSettingId', (req, res) => {
    TaxSetting.findByIdAndRemove(req.params.taxSettingId).then(taxSetting => {
        if (taxSetting) {
            return res.status(200).json({success: true, message: 'the tax setting is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'tax setting not found!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})
module.exports = router;