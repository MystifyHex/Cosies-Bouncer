const { Message, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    let messagecount = parseInt(args[0]);

    if (isNaN(messagecount))
      return message.channel.send(
        "Please provide a vaild number of messages for me to delete."
      );

    message.channel
      .bulkDelete(args[0])
      .then((messages) =>
        message.channel
          .send(
            `**Succesfully deleted \`${messages.size}/${args[0]}\` messages**`
          )
          .then((msg) => msg.delete({ timeout: 5000 }))
      )
      .catch(() => null);
}

module.exports.help = {
  aliases: ['delete', 'clear'],
  name: 'purge',
  description: 'Purge a channel messages.',
  usage: '>purge <amount>',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Moderation',
  userPerms: ['MANAGE_MESSAGES'],
  disable: false,
  cooldown: 1000,
};
