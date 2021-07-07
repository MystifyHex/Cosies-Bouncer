const { Schema, model } = require("mongoose")

module.exports = model(
    "blacklisted-members",
    new Schema({
        userId: {
            type: String,
            required: true
        },

        blacklisted: {
            type: Boolean,
            default: false
        }
    })
)