const mongoose = require('mongoose');

const MoneySchema = mongoose.Schema({
    username: String,
    password: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('user', MoneySchema);
