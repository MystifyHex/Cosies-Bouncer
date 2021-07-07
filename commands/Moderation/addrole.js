const { Client, Message, MessageEmbed } = require("discord.js");


module.exports.run = async (client, message, args) => {

  const target = message.mentions.members.first();
  if (!target) return message.channel.send(`Please specify a vaild member.`);
  const role = message.mentions.roles.first();
  if (!role) return message.channel.send("Please specify a role.");

  await target.roles.add(role);
  message.channel.send(
    new MessageEmbed().setDescription(
      `${role.name} role was added to ${target.user.username}`
    )
  );
}

module.exports.help = {
  aliases: ['ar'],
  name: 'addrole',
  description: 'Add a role',
  usage: '>addrole @user <role>',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  userPerms: ['MANAGE_ROLES'],
  disable: false,
  cooldown: 1000,
};
