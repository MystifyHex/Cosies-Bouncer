const { Client, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send("Please join a voice channel.");

  if (!args[0])
    return message.channel.send(
      "Please provide a song to play! | `play <song name or url>`"
    );

  client.player.play(message, args.join(" "));
};

module.exports.help = {
  aliases: [],
  name: "play",
  description: "Play a song.",
  usage: ".play <name or url>",
};

module.exports.config = {
  args: false,
  restricted: false,
  userPerms: [],
  category: "Music",
  disable: false,
  cooldown: 1000,
};
