const { Schema, model } = require("mongoose");

const redditSchema = new Schema({
  guildId: String,
  postedPosts: Array,
  subreddits: Object,
});

module.exports = model("Reddit", redditSchema);
