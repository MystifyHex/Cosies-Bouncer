const { Schema, model } = require("mongoose");

const redditSchema = new Schema({
  GuildID: String,
  IDCreate: String,
  IDClose: String,
  IDDelete: String,
  IDTranscript: String,
  transcriptChannel: String,
  modRole: String,
  UsedBy: Array,
});

module.exports = model("tickets", redditSchema);
