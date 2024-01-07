const mongoose = require('mongoose');

const taxSettingSchema = mongoose.Schema({
    applicableCategories: [
        {
            type: String,
        }
    ],
    taxPercentage: {
        type: String,
    }
});

exports.TaxSetting = mongoose.model('TaxSetting', taxSettingSchema);