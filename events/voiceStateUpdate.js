const { MessageEmbed } = require("discord.js");
const Schema = require("../models/Guild/schema");

module.exports = (client, oldState, newState) => {
  if (newState.member.voice.selfMute) return;

  Schema.findOne({ guildID: newState.guild.id }, async (e, data) => {
    if (!data) return;
    const channel = client.channels.cache.get(data.logChannelID);
    if (newState.channel == null)
      return channel.send(
        new MessageEmbed()
          .setAuthor(
            `${newState.member.user.username}#${newState.member.user.discriminator}`,
            newState.member.user.displayAvatarURL()
          )
          .setColor("#FF470F")
          .setFooter(`ID: ${newState.id}`)
          .setTimestamp()
          .setDescription(
            `**<@${newState.id}> left voice channel ${oldState.channel}**`
          )
      );
    else if (oldState.channel === null)
      channel.send(
        new MessageEmbed()
          .setAuthor(
            `${newState.member.user.username}#${newState.member.user.discriminator}`,
            newState.member.user.displayAvatarURL()
          )
          .setFooter(`ID: ${newState.id}`)
          .setColor("#43B582")
          .setTimestamp()
          .setDescription(
            `**<@${newState.id}> joined voice channel ${newState.channel}**`
          )
      );
    else
      channel.send(
        new MessageEmbed()
          .setAuthor(
            `${newState.member.user.username}#${newState.member.user.discriminator}`,
            newState.member.user.displayAvatarURL()
          )
          .setFooter(`ID: ${newState.id}`)
          .setColor("#43B582")
          .setDescription(
            `**<@${newState.id}> switched voice channel ${oldState.channel} -> ${newState.channel}**`
          )
      );
  });
};
