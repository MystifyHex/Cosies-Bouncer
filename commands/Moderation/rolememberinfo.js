
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {

  if (args.includes("@everyone")) return;

  if (args.includes("@here")) return;

  if (!args[0]) return message.channel.send("**Please Enter A Role!**");

  let role =
    message.mentions.roles.first() ||
    message.guild.roles.cache.get(args[0]) ||
    message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
    );

  if (!role) return message.channel.send("**Please Enter A Valid Role!**");

  let membersWithRole = message.guild.members.cache
    .filter((member) => {
      return member.roles.cache.find((r) => r.name === role.name);
    })
    .map((member) => {
      return member.user.tag;
    });
  if (membersWithRole > 2048)
    return message.channel.send("**List Is Too Long!**");

  let roleEmbed = new MessageEmbed()
    .setColor("GREEN")
    .setThumbnail(message.guild.iconURL())
    .setTitle(`Users With The ${role.name} Role!`)
    .setDescription(membersWithRole.join("\n"));
  message.channel.send(roleEmbed);
}

module.exports.help = {
  aliases: ['rmi'],
  name: 'rolememberinfo',
  description: 'Role member info.',
  usage: '>rolememberinfo',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  userPerms: ['MANAGE_ROLES'],
  disable: false,
  cooldown: 1000,
};