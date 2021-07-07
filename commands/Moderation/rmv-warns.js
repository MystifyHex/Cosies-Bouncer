const { Client, Message, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
const db = require("../../models/warn")

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send('deleted the warn')
                data.save()
            } else {
                message.channel.send('This user does not have any warns in this server!')
            }
        })
}

module.exports.help = {
  aliases: ['remove-warns'],
  name: 'rmv-warns',
  description: 'Remove user\'s warns.',
  usage: '>rmv-warns @user',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  userPerms: ['MANAGE_MESSAGES'],
  disable: false,
  cooldown: 1000,
};