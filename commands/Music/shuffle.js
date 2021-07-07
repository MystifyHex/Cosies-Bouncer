const { Client, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You are not connected to any voice channel!"
      );

    if (!client.player.getQueue(message))
      return message.channel.send(
        "There is no music being played on this server!"
      );

    try {
      client.player.shuffle(message);
      return message.channel.send("Successfully shuffled the queue!");
    } catch (err) {
      console.log(`Music Error: ${err}`);
    }
}

module.exports.help = {
  aliases: [],
  name: 'shuffle',
  description: "Suffle the current queue",
  usage: '>shuffle',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Music',
  userPerms: [],
  disable: false,
  cooldown: 1000,
};
