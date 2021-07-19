const mongoose = require('mongoose');

const currencyListSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    abbreviation: String,
    name: String
});

module.exports = mongoose.model('Currency', currencyListSchema);