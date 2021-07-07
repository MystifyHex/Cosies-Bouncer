const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require("../../models/blacklist");

module.exports.run = async (client, message, args) => {
    if (message.author.id !== message.guild.ownerID)
      return message.channel.send(
        "You must be the server owner to run this command!"
      );

    let user = message.mentions.users.first();
    if (!user) return message.channel.send("Please mentions a user!");

    let data;
    try {
      data = await schema.findOne({
        userId: user.id,
      });
      if (!data) {
        data = await schema.create({
          userId: user.id,
        });
      }
    } catch (error) {
      console.log(error);
    }

    data.blacklisted = true;
    await data.save();
    return message.channel.send(`Successfully blacklisted ${user.tag}`);
}

module.exports.help = {
  aliases: ['bl'],
  name: 'blacklist',
  description: 'Secret.',
  usage: '>blacklist @user',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Owner',
  disable: false,
  cooldown: 1000,
  userPerms: [],
};
