const { MessageEmbed } = require("discord.js");
const Schema = require("../models/Guild/schema");

module.exports = (client, role) => {
    Schema.findOne({ guildID: role.guild.id }, async (e, data) => {
      if (!data) return;
      try {
        const fetchLogs = await role.guild.fetchAuditLogs({
          limit: 1,
          type: "ROLE_DELETE",
        });

        const logs = fetchLogs.entries.first();
        const { executor } = logs;

        const channel = client.channels.cache.get(data.logChannelID);
        const roleCreated = new MessageEmbed()
          .setColor("#FF470F")
          .setAuthor(
            role.guild.name,
            role.guild.iconURL()
          )
          .setDescription(`**Role Deleted: ${role.name}**`)
          .setTimestamp()
          .setFooter(`ID: ${role.guild.id}`);
        channel.send(roleCreated);
      } catch (err) {
        console.log(err);
      }
  });
};
