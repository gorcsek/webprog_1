const mongoose = require('mongoose');

const MoneySchema = mongoose.Schema({
    amount: Number,
    user: String,
    description: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('money', MoneySchema);
