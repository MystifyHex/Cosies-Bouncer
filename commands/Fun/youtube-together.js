

const { Client, Message, MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to run this command!"
    );

  client.dt
    .createTogether(message.member.voice.channel.id, "youtube")
    .then(async (link) => {
      message.channel.send(
        `Here is your youtube together code! ${link.code}`
      );
    });
}

module.exports.help = {
  aliases: ["yt-together"],
  name: 'youtube-together',
  description: '',
  usage: '>youtube-together <game>',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Fun',
  userPerms: [],
  disable: false,
  cooldown: 1000,
};
