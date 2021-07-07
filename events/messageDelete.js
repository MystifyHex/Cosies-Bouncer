const { MessageEmbed } = require("discord.js");
const Schema = require("../models/Guild/schema");

module.exports = (client, message) => {
    Schema.findOne({ guildID: message.guild.id }, async (e, data) => {
      if (!data) return;
      const DeletedLog = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("#FF470F")
        .setDescription(
          `Message sent by ${message.author} deleted in ${message.channel}
        ${message.content}`
        )
        .setFooter(`Author: ${message.author.id}`)
        .setTimestamp();

      const channel = client.channels.cache.get(data.logChannelID);
      channel.send(DeletedLog);
    });
};
