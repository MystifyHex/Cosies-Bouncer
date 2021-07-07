const { Schema, model } = require("mongoose");

module.exports = model(
  "mod-logs-channels",
  new Schema({
    Guild: String,
    Channel: String,
  })
);