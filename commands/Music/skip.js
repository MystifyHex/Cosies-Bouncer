
      
    
module.exports.run = async (client, message, args) => {
const { Client, Message, MessageEmbed } = require("discord.js");


    if (!message.member.voice.channel)
      return message.channel.send(
        "You are not connected to any voice channel!"
      );

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        "You are currently not in the same voice channel!"
      );

    if (!client.player.getQueue(message))
      return message.reply("There is no music being played on this server!");

    const success = client.player.skip(message);

    if (success)
      return message.channel.send(
        `The music has currently been skipped to ${client.player.nowPlaying(
          message
        )}`
      );
  }
  module.exports.help = {
    aliases: ['s'],
    name: 'skip',
    description: "",
    usage: '>s',
  };
  
  module.exports.config = {
    args: false,
    restricted: false,
    category: 'Music',
    disable: false,
    cooldown: 1000,
    userPerms: [],
  };