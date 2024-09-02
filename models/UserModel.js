let mongoos = require("mongoose")

let userSchema = mongoos.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    avatar: {
        type: String,
    }
}, {
    timestamps: true
})


module.exports = mongoos.model('User', userSchema)