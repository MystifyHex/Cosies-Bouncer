module.exports.run = async (client, message, args, utils, data) => {

	if (!args[0]) return message.reply('Please provide a new prefix.');

	if (args[0].length > 5) return message.channel.send('Your new prefix must be under `5` characters.');

	await require('../../models/Guild/schema').findOne({guildID: message.guild.id}, async (err, data) => {
    data.prefix = args.slice(0).join(" ")
    data.save()
    })
	message.channel.send(`The new prefix is **\`${args.slice(0).join(" ")}\`**`);

};

module.exports.help = {
	aliases: ['prefixset'],
	name: 'setprefix',
	description: 'change the bot\'s prefix',
	usage: '..setprefix %prefix%',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Config',
	disable: false,
    userPerms: ['MANAGE_GUILD'],
	cooldown: 10000,
};