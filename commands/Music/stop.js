const { Client, Message } = require("discord.js");


  module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message);

    if (!queue) {
      return message.channel.send(
        "There is no music being played on this server!"
      );
    }

    client.player.stop(message);
    return message.channel.send("Successfully stopped the music!");
  }
  
  module.exports.help = {
    aliases: [],
    name: 'stop',
    description: "Stop the currently playing song",
    usage: '>stop',
  };
  
  module.exports.config = {
    args: false,
    restricted: false,
    category: 'Music',
    disable: false,
    cooldown: 1000,
    userPerms: [],
  };
