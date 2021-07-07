const serverSchema = require("../../models/Guild/rules");
const Util = require("utils-discord");

module.exports.run = async (client, message, args) => {
  const data = await Util.mongoFind(serverSchema, {
    guildId: message.guild.id,
  });

  const prefix = data.prefix;

  const channel = message.mentions.channels.first();

  serverSchema.findOne({ guildId: message.guild.id }, async (err, data) => {
    if (!data) return;
    if (data) {
      data.Channel = channel.id;
      data.save();
    } else {
      new serverSchema({
        guildId: message.guild.id,
        Channel: channel.id,
      }).save();
    }
  });
  if (!args[0])
    return message.channel.send(
      "Please provide rules you want you members to follow."
    );

  channel.send(args[0])
};

module.exports.help = {
  aliases: ["ss"],
  name: "set-birthday-channel",
  description: "Sets the settings for the whole server.",
  usage: ".server rules <args/text>",
};

module.exports.config = {
  args: false,
  restricted: false,
  category: "Config",
  disable: false,
  userPerms: ["MANAGE_GUILD"],
  cooldown: 1000,
};
