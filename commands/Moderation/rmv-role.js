const { Client, Message, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('Please specify someone to give a role to.')
      return
    }

    const roleName = args.slice(0).join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {
      message.reply(`There is no role with the name "${roleName}"`)
      return
    }

    const member = guild.members.cache.get(targetUser.id)

    if (member.roles.cache.get(role.id)) {
      member.roles.remove(role)
      message.reply(`That user no longer has the ${roleName} role`)
    } else {
      message.reply(`That user does not have the ${roleName} role`)
    }

}

module.exports.help = {
  aliases: ['remove-role'],
  name: 'rmv-role',
  description: 'Remove a user roles.',
  usage: '>rmv-role @user @role',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  userPerms: ['MANAGE_ROLES'],
  disable: false,
  cooldown: 1000,
};
