const { Client, Message, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {

  message.guild.channels.cache.forEach((channel) => {
    try {
      channel.updateOverwrite(
        message.guild.roles.cache.find(
          (e) => e.name.toLowerCase().trim() == "@everyone"
        ),
        {
          SEND_MESSAGES: true
        }
      );
    } catch (err) {
      console.log(err);
      message.channel.send(`I was unable to lock down ${channel}`)
    }
  });

}

module.exports.help = {
  aliases: [],
  name: 'lockdown',
  description: 'Lock down a server.',
  usage: '>lockdown',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  userPerms: ['ADMINISTRATOR'],
  disable: false,
  cooldown: 1000,
};

