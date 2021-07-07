const { MessageEmbed } = require("discord.js");
const Schema = require("../models/Guild/schema");
const { formatDate } = require("../data/functions");

module.exports = (client, member) => {
    Schema.findOne({ guildID: member.guild.id }, async (e, data) => {
      if (!data) return;

      const created = formatDate(member.user.createdAt);

      const channel = client.channels.cache.get(data.logChannelID);
      const Left = new MessageEmbed()
        .setAuthor("Member Left")
        .setDescription(
          `${member.user} ${member.user.username}#${member.user.discriminator}`
        )
        .setColor("#FF470F")
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()
      channel.send(Left);
    });
};
