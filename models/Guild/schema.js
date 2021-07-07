const { Schema, model } = require("mongoose");

module.exports = model(
  "settings",
  new Schema({
    guildID: { type: String, required: true },
    ownerRoleID: { type: String , default: null },
    modRoleID: { type: String , default: null },
    adminRoleID: { type: String , default: null },
    autoRoleID: { type: String , default: null },
    logChannelID: { type: String , default: null },
    welcomeChannelID: { type: String , default: null },
    Cmds: { type: Array , default: [] },
    prefix: { type: String, default: '.' },
  })
);
