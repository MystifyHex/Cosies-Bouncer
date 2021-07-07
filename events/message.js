const Discord = require('discord.js');

module.exports = async (client, message) => {
	if (!message.guild) return;


	if (message.author.bot) return;
	const s = require('../models/Guild/schema')
	await s.findOne({ guildID: message.guild.id }).lean().exec().then(async (data) => {
		if (!data || typeof data == null) s.create({ guildID: message.guild.id })
		const prefix = data.prefix

		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		let command = args.shift().toLowerCase();


		if (client.aliases.has(command)) {
			command = client.commands.get(client.aliases.get(command)).help.name;
		}


		const commandFile = client.commands.get(command);

		if (!commandFile) return;

		if (client.commands.get(command).config.disable == true) {
			return message.channel.send(':warning: This command is disabled for a short period of time! :warning:');
		}

		if (client.commands.get(command).config.args == true) {
			if (!args[0]) {
				return message.channel.send(`Invalid arguments. Use: ${prefix + 'help ' + client.commands.get(command).help.name}`);
			}
		}

		if (data.cmdsR && data.cmdsR.split('|')[0] === command && !message.member.roles.cache.has(data.cmdsR.split('|')[1])) return message.reply('This command requires **' + message.guild.roles.cache.get(data.cmdsR.split('|')[1]).name + '**.')
		if (data.Cmds.includes(command)) return;
		if (!commandFile.config.userPerms) commandFile.config.userPerms = []
		if (!message.member.hasPermission(commandFile.config.userPerms)) {
			const beauty = commandFile.config.userPerms.join('\`, \`');
			const noUserPerms = new Discord.MessageEmbed()
				.setTitle('Missing Permissions')
				.setDescription(`You are missing these permissions: \`${beauty}\`.`)
				.setColor('RED');
			return message.channel.send(noUserPerms)
		}
		const cooldown = client.commands.get(command).config.cooldown;

		const timestamps = client.cooldowns.get(command);
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldown;
			if (Date.now() < expirationTime) {
				const timeLeft = require('pretty-ms')(expirationTime);
				return message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.username}, this command is in cooldown...`).setDescription(`This command is on cooldown for **${timeLeft}**\nThe default cooldown for this command is **\`${require('ms')(cooldown + Date.now())}\`**`).setColor('RED'));
			}
		}

		if (commandFile) {
			try {
				await timestamps.set(message.author.id, Date.now());
				setTimeout(
					async () => await timestamps.delete(message.author.id), cooldown);
				await commandFile.run(client, message, args);
			}
			catch (error) {
				console.log(error)
			}
		}
	})
};