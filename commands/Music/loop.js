
    
module.exports.run = async (client, message, args) => {
const { Client, Message, MessageEmbed } = require("discord.js");

"Set the queue or song to repeat mode."
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
      return message.channel.send(
        "There is no music being played on this server!"
      );

      if (!args.join(" ")) {
        message.channel.send("Please specify if you want to loop the track or the queue")
      }

    if (args.join(" ").toLowerCase("queue")) {
      if (client.player.getQueue(message).loopMode) {
        client.player.setLoopMode(message, false);
        return message.channel.send(
          "Repeat mode has been disabled for the queue!"
        );
      } else {
        client.player.setLoopMode(message, true);
        return message.channel.send(
          "Repeat mode has been enabled for the queue!"
        );
      }
    } if (args.join(" ").toLowerCase("track")) {
      if (client.player.getQueue(message).repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.channel.send(
          `${client.player.nowPlaying(message)} will not be repeated!`
        );
      } else {
        client.player.setRepeatMode(message, true);
        return message.channel.send(
          `${client.player.nowPlaying(message)} will now be repeated!`
        );
      }
  }
}
module.exports.help = {
  aliases: [],
  name: 'loop',
  description: "",
  usage: '>loop',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Music',
  disable: false,
  cooldown: 1000,
  userPerms: [],
};