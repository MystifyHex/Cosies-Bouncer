
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
    const db = require("../../models/warn")

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send('User not found.')
    const reason = args.slice(1).join(" ")
    db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            message.channel.send(new MessageEmbed()
                .setTitle(`${user.user.tag}'s warns`)
                .setDescription(
                    data.content.map(
                        (w, i) =>
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                    )
                )
                .setColor("BLUE")
            )
        } else {
            message.channel.send('User has no data')
        }

    })
}

module.exports.help = {
    aliases: ['warn-list'],
    name: 'warns',
    description: 'Displays a user warnings.',
    usage: '>warns @user',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'Moderation',
    disable: false,
    userPerms: ['MANAGE_MESSAGES'],
    cooldown: 1000,
};