const {Reward} = require('../models/reward');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const rewardList = await Reward.find();

    if (!rewardList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(rewardList);
})

router.get('/:rewardId', async (req, res) => {
    const reward = await Reward.findById(req.params.rewardId);

    if (!reward) {
        res.status(404).json({message: 'The reward with the given ID was not found!'})
    }

    res.status(200).send(reward);
})

router.post('/', async (req, res) => {
    let reward = new Reward({
        reward: req.body.reward,
        pointsRequired: req.body.pointsRequired
    })
    reward = await reward.save();

    if (!reward)
    return res.status(404).send('Bad Request from Client')

    res.status(200).send(reward);
})

router.patch('/:rewardId', async (req, res) => {
    const reward = await Reward.findByIdAndUpdate(
        req.params.rewardId,
        {
            reward: req.body.reward,
            pointsRequired: req.body.pointsRequired
        },
        { new: true}
    )

    if (!reward)
    return res.status(404).send('Bad Request from Client')

    res.status(200).send(reward);
})

router.delete('/:rewardId', (req, res) => {
    Reward.findByIdAndRemove(req.params.rewardId).then(reward => {
        if (reward) {
            return res.status(200).json({success: true, message: 'the reward is deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'reward not found!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})
module.exports = router;