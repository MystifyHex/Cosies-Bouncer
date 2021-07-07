

module.exports.run = async (client, message, args) => {
    const { Client, Message, MessageEmbed } = require('discord.js');
    const birthday = require("../../models/birthday")


    if (!message.mentions.channels.first())
        return message.channel.send("You must **mention** a channel!");

    const mongoData = await birthday.findOne({
        guildId: message.guild.id
    });

    if (!mongoData) {
        const newData = new birthday({
            guildId: message.guild.id,
            channelId: message.mentions.channels.first().id
        });
        await newData.save();
    } else {
        mongoData.channelId = message.mentions.channels.first().id;
        await mongoData.save();
    }
    return message.channel.send("Successfully set the birthday channel!");

}

module.exports.help = {
    aliases: ['r'],
    name: 'set-birthday-channel',
    description: "Sets the settings for the whole server.",
    usage: '>set-birthday-channel <add/remove>',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: "Config",
    disable: false,
    userPerms: ['MANAGE_CHANNELS'],
    cooldown: 1000,
};