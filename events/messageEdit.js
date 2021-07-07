const { MessageEmbed } = require("discord.js");
const Schema = require("../models/Guild/schema");

module.exports = (client, oldMessage, newMessage) => {
    Schema.findOne({ guildID: newMessage.guild.id }, async (e, data) => {
      if (!data) return;
      const EditedLog = new MessageEmbed()
        .setAuthor(
          oldMessage.author.tag,
          oldMessage.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("#FF470F")
        .setDescription(`**Message edited in ${oldMessage.channel}** [Jump to Message](${newMessage.url})`)
        .addField("**Before**", oldMessage.content)
        .addField("**After**", newMessage.content)
        .setFooter(`Author: ${oldMessage.author.id}`)
        .setTimestamp();

      const channel = client.channels.cache.get(data.logChannelID);
      channel.send(EditedLog);
    });
};
