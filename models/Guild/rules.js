const { Schema, model } = require("mongoose")

module.exports = model(
    "server-settings",
    new Schema({
        guildId: { type: String, required: true },
        Channel: { type: String, default: null }
    })
)