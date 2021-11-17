const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notifications = new Schema({
    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    content : {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Notification', Notifications);