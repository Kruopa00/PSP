const mongoose = require('mongoose');

const rewardSchema = mongoose.Schema({
    reward: {
        type: String,
    },
    pointsRequired: {
        type: Number,
    }
});

exports.Reward = mongoose.model('Reward', rewardSchema);