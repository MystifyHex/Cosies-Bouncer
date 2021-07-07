
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  const Schema = require("../../models/mute");

  const Member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (!Member) return message.channel.send("Please specify a member");

  const role = message.guild.roles.cache.find(
    (r) => r.name.toLowerCase() === "muted"
  );

  Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) return message.reply("That member wasnt muted");
    const user = data.Users.findIndex((prop) => prop === Member.id);
    if (user == -1) return message.reply("That Member isnt muted");
    data.Users.splice(user, 1);
    data.save();
    await Member.roles.remove(role);
    message.channel.send(`${Member.displayName} is now unmuted`);
  });
}

module.exports.help = {
  aliases: ['um'],
  name: 'unmute',
  description: 'Unmute a user.',
  usage: '>unmute @user',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  userPerms: ['MANAGE_MESSAGES'],
  disable: false,
  cooldown: 1000,
};