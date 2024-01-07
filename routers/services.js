const {Service} = require('../models/service');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const serviceList = await Service.find();

    if (!serviceList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(serviceList);
})

router.get('/:serviceId', async (req, res) => {
    const service = await Service.findById(req.params.serviceId);

    if (!service) {
        res.status(404).json({message: 'The service with the given ID was not found!'})
    }

    res.status(200).send(service);
})

router.post('/', async (req, res) => {
    let service = new Service({
        name: req.body.name,
        duration: req.body.duration,
        price: req.body.price,
        category: req.body.category
    })
    service = await service.save();

    if (!service)
    return res.status(404).send('the service cannot be created!')

    res.status(200).send(service);
})

router.patch('/:serviceId', async (req, res) => {
    const service = await Service.findByIdAndUpdate(
        req.params.serviceId,
        {
            name: req.body.name,
            duration: req.body.duration,
            price: req.body.price,
            category: req.body.category
        },
        { new: true}
    )

    if (!service)
    return res.status(404).send('the service cannot be created!')

    res.status(200).send(service);
})

router.delete('/:serviceId', (req, res) => {
    Service.findByIdAndRemove(req.params.serviceId).then(service => {
        if (service) {
            return res.status(200).json({success: true, message: 'the service is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'service not found!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})
module.exports = router;