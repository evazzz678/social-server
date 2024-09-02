// models/Friend.js
const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true

    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        }
    ]


});

module.exports = mongoose.model('Friend', FriendSchema);
