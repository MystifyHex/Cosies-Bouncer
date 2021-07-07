
const { Client, Message, MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  const ms = require("ms");
  const Schema = require("../../models/mute");

  const Member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  const time = args[1];
  if (!Member) return message.channel.send("Please specify a member");
  if (!time) return message.channel.send("Please specify a time.");
  const role = message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === "muted"
  );
  if (!role) {
    try {
      message.channel.send(
        "There was an error finding muted role, attempting to create muted role."
      );

      let muterole = await message.guild.roles.create({
        data: {
          name: "muted",
          permissions: [],
        },
      });
      message.guild.channels.cache
        .filter((c) => c.type === "text")
        .forEach(async (channel, id) => {
          await channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          });
        });
      message.channel.send("Muted role has sucessfully been created.");
    } catch (error) {
      console.log(error);
    }
  }
  let role2 = message.guild.roles.cache.find(
    (r) => r.name.toLowerCase() === "muted"
  );
  if (Member.roles.cache.has(role2.id))
    return message.channel.send(
      `${Member.displayName} has already been muted.`
    );
  await Member.roles.add(role2);
  message.channel.send(`${Member.displayName} is now muted.`);

  setTimeout(async () => {
    await Member.roles.remove(role2);
    message.channel.send(`${Member.displayName} is now unmuted`);
  }, ms(time));
}

module.exports.help = {
  aliases: ['tm'],
  name: 'tempmute',
  description: 'Temp mute a user.',
  usage: '>tm @user <time>',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  userPerms: ['MANAGE_MESSAGES'],
  disable: false,
  cooldown: 1000,
};