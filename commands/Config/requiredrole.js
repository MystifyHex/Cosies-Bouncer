module.exports.run = async (client, message, args, utils, data) => {

    if (!args[0]) return message.reply('Please provide a command.');
    if (!args[1]) return message.reply('Please provide a role.');

    const role = message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()

    if (!role) return message.reply('Please provide a valid role.');
    if (!client.commands.get(arge[0])) return message.reply('Please provide a valid command.');
    
    await require('../../models/Guild/schema').findOne({ guildID: message.guild.id }, async (err, data) => {
        if (data.cmdsR.split('|')[0] === args[0] && data.cmdsR.split('|')[1] === args[1]) return message.reply('Please provide a required role and command that are not already activated.');
        data.cmdsR.push(args[0] + '|' + role.id)
        data.save()
    })
    message.channel.send(`Command \`${args[0]}\` now requires **${role.name}**.`);
};

module.exports.help = {
    aliases: ['rr'],
    name: 'requiredrole',
    description: '',
    usage: '..requiredrole [roleID] []',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'Config',
    disable: false,
    userPerms: ['MANAGE_GUILD'],
    cooldown: 10000,
};