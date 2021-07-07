

const { Client, Message, MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  const db = require("../../models/warn");

  const user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!user) return message.channel.send("User not found.");
  const reason = args.slice(1).join(" ");
  db.findOne(
    { guildid: message.guild.id, user: user.user.id },
    async (err, data) => {
      if (err) throw err;
      if (!data) {
        data = new db({
          guildid: message.guild.id,
          user: user.user.id,
          content: [
            {
              moderator: message.author.id,
              reason: reason,
            },
          ],
        });
      } else {
        const obj = {
          moderator: message.author.id,
          reason: reason,
        };
        data.content.push(obj);
      }
      data.save();
    }
  );
  user.send(
    new MessageEmbed()
      .setDescription(`You have been warned for ${reason}`)
      .setColor("RANDOM")
  );
  message.channel.send(
    new MessageEmbed()
      .setDescription(`Warned ${user} for ${reason}`)
      .setColor("RANDOM")
  );
}

module.exports.help = {
  aliases: ['w'],
  name: 'warn',
  description: 'Warn a user.',
  usage: '>warn @user <reason>',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  disable: false,
  userPerms: ['MANAGE_MESSAGES'],
  cooldown: 1000,
};