const { Client, Message, MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
    try {
      let member =
        (await message.mentions.members.first()) ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          (r) =>
            r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          (r) =>
            r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.member;

      const roles =
        member.roles.cache
          .filter((r) => r.id !== message.guild.id)
          .map((r) => r.name)
          .join(" | ") || "none";

      const RolesEmbed = new MessageEmbed()
        .setAuthor(
          `${message.author.username}'s Roles`,
          message.author.displayAvatarURL()
        )
        .setFooter(`Author: ${message.author.id}`)
        .setTimestamp()
        .setDescription(`${roles}`, true);
      message.channel.send(RolesEmbed);
    } catch (err) {
      console.log(err);
    }
}

module.exports.help = {
  aliases: ['hr'],
  name: 'hasrole',
  description: 'Check if user\'s roles.',
  usage: '>hasrole @user',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  disable: false,
  
  cooldown: 1000,
};


