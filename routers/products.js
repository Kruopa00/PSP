const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(productList);
})

router.get('/:productId', async (req, res) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404).json({message: 'The product with the given ID was not found!'})
    }

    res.status(200).send(product);
})

router.post('/', async (req, res) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stockLevel: req.body.stockLevel,
        category: req.body.category
    });
    product = await product.save();

    if (!product)
    return res.status(404).send('the product cannot be created!')

    res.status(200).send(product);
})

router.patch('/:productId', async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.productId,
        {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stockLevel: req.body.stockLevel,
            category: req.body.category
        },
        { new: true}
    )

    if (!product)
    return res.status(404).send('the product cannot be created!')

    res.status(200).send(product);
})

router.delete('/:productId', (req, res) => {
    Product.findByIdAndRemove(req.params.productId).then(product => {
        if (product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'product not found!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})
module.exports = router;