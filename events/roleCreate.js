const { MessageEmbed } = require("discord.js");
const Schema = require("../models/Guild/schema");

module.exports = (client, role) => {
    Schema.findOne({ guildID: role.guild.id }, async (e, data) => {
      if (!data) return;
      try {
        const fetchLogs = await role.guild.fetchAuditLogs({
          limit: 1,
          type: "ROLE_CREATE",
        });

        const logs = fetchLogs.entries.first();
        const { executor } = logs;

        const channel = client.channels.cache.get(data.logChannelID);
        const roleCreated = new MessageEmbed()
          .setColor("#43B582")
          .setAuthor(
            role.guild.name,
            role.guild.iconURL()
          )
          .setDescription(`**Role Created: ${role.name}**`)
          .setTimestamp()
          .setFooter(`ID: ${role.guild.id}`);
        channel.send(roleCreated);
      } catch (err) {
        console.log(err);
      }
  });
};
