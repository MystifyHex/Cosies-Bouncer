const { Client, Message, MessageEmbed } = require("discord.js");


module.exports.run = async (client, message, args) => {
    const membercount = message.guild.memberCount;

    const embed = new MessageEmbed()
      .setTitle("Members")
      .setDescription(`${membercount}`)
      .setColor("#337FD5")
      .setTimestamp();

    message.channel.send(embed);
}

module.exports.help = {
  aliases: ['r'],
  name: 'membercount',
  description: '',
  usage: '>membercount',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Fun',
  disable: false,
  cooldown: 1000,
  userPerms: [],
};

