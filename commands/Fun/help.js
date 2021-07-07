const Discord = require('discord.js');
const fs = require('fs');

module.exports.help = {
    aliases: ['halp'],
    name: 'help',
    description: '',
    usage: '>help',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'Information',
    disable: false,
    userPerms: [],
    cooldown: 1000,
};

module.exports.run = async (client, message, args) => {
    try {
        const prefix = '>'
        if (!args[0]) {
            const a = new Discord.MessageEmbed()
                .setTitle('Help board.')
                .addField("🎮 Fun", `\`${prefix}help Fun\``, true)
                .addField("🎫 Tickets", `\`${prefix}help Tickets\``, true)
                .addField("⚒️ Moderation", `\`${prefix}help Moderation\``, true)
                .addField("💦 Config", `\`${prefix}help Config\``, true)
                .addField("🎵 Music", `\`${prefix}help Music\``, true)
                .setThumbnail(client.user.avatarURL({ type: 'png' }))
                .setColor('RANDOM');
            const { MessageButton, MessageActionRow } = require('discord-buttons')

            let btn1 = new MessageButton().setLabel('Fun').setID('fun').setStyle('red').setEmoji('🎮')
            let btn2 = new MessageButton().setLabel('Tickets').setID('tickets').setStyle('green').setEmoji('🎫')
            let btn3 = new MessageButton().setLabel('Moderation').setID('moderation').setStyle('blurple').setEmoji('⚒️')
            let btn4 = new MessageButton().setLabel('Config').setID('config').setStyle('gray').setEmoji('⚙️')
            let btn5 = new MessageButton().setLabel('Music').setID('music').setStyle('red').setEmoji('🎵')
            let row = new MessageActionRow()
                .addComponent(btn1)
                .addComponent(btn2)
                .addComponent(btn3)
                .addComponent(btn4)
                .addComponent(btn5)
            message.channel.send({ embed: a, components: [row] });
        }
        else {
            const categoryArray = fs.readdirSync('./commands/');
            const category = categoryArray.filter(x => x === args[0].toLowerCase()).join('');
            if (category) {
                const cmds = client.commands.filter(x => x.config.category.toLowerCase() === category.toLowerCase()).map(cmd => `\`${cmd.help.name}\``).join(', ');
                const cmdsEmbed = new Discord.MessageEmbed()
                    .setTitle(`${category.slice(0, 1).toUpperCase()}${category.slice(1)} Commands`)
                    .setDescription(cmds)
                    .setColor('RANDOM')
                    .setFooter('Page 1/1');
                return message.channel.send(cmdsEmbed);
            }
            else if (client.commands.has(args[0])) {
                const cmd = client.commands.get(args[0]);
                const b = new Discord.MessageEmbed()
                    .setTitle(`${cmd.help.name.slice(0, 1).toUpperCase()}${cmd.help.name.slice(1).toLowerCase()}`)
                    .addField('**Description:**', '`' + cmd.help.description + '`')
                    .addField('**Usage:**', '`' + cmd.help.usage + '`')
                    .addField('**Aliases:**', cmd.help.aliases.join(', ') ? '`' + cmd.help.aliases.join('`, `') + '`' : 'None')
                    .addField('**Category**', '`' + cmd.config.category + '`')
                    .addField('**Disabled**', cmd.config.disable ? '`True`' : '`False`')
                    .setColor('RANDOM');
                return message.channel.send(b);
            }
            else {
                return message.reply(':x: I couldn\'t find that command!');
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};