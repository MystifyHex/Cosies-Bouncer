

module.exports.run = async (client, message, args) => {
  const { Client, Message, MessageEmbed } = require("discord.js");
  const axios = require("axios");

  const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
    args
  )}`;

  if (!args[0])
    return message.channel.send(
      "Please specify the specific part of the documentation you would like to see."
    );

  axios
    .get(uri)
    .then((embed) => {
      const { data } = embed;

      if (data && !data.error) {
        message.channel.send({ embed: data });
      } else {
        message.reply("Could not find that documentation");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports.help = {
  aliases: ['doc'],
  name: 'docs',
  description: '',
  usage: '>docs <method>',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Development',
  disable: false,
  userPerms: [],
  cooldown: 1000,
};