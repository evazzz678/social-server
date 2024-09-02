let mongoose = require("mongoose")

let FollowersSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        }
    ]
})


module.exports = mongoose.model('Followers', FollowersSchema)