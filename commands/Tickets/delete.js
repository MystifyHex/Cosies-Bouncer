module.exports.run = async (client, message, args, utils, data) => {
    const Discord = require('discord.js');

    const tickets = require('../../models/tickets');


    tickets.findOne({ GuildID: message.guild.id }).lean().exec().then((d) => {
        if (!d || typeof d == null) return message.reply('This server already has a ticket system!');
        tickets.findOneAndDelete({
            GuildID: message.guild.id,
          }, (err) => {
            if (err) throw err;
          });
          message.reply('Success.')
    })
};

module.exports.help = {
    aliases: [],
    name: 'tickets-delete',
    description: 'delete tickets',
    usage: '>tickets-delete',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'Tickets',
    disable: false,
    userPerms: ['MANAGE_GUILD'],
    cooldown: 10000,
};