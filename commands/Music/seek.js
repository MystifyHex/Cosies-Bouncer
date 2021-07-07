const { Client, Message } = require("discord.js");

  module.exports.run = async (client, message, args) => {
    if (!args[0])
      return message.channel.send("Please provide a timecode to seek to");

    client.player.seek(message, parseInt(args.join(" ")) * 1000);
    return message.channel.send("Successfully moved player positon");
  }
  
  module.exports.help = {
    aliases: [],
    name: 'seek',
    description: 'Jump to a specific spot in the song',
    usage: '>seek <timestamp in sec>',
  };
  
  module.exports.config = {
    args: false,
    restricted: false,  userPerms: [],
    category: 'Music',
    disable: false,
    cooldown: 1000,
  };

