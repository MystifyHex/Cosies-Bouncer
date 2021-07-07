
    module.exports.run = async (client, message, args) => {
const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require("../../models/member-count");

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) data.delete();

      const channel = await message.guild.channels.create(
        `Members: ${message.guild.memberCount}`,
        {
          type: "voice",
          permissionsOverwrites: [
            {
              id: message.guild.id,
              deny: ["CONNECT"],
            },
          ],
        }
      );

      new Schema({
        Guild: message.guild.id,
        Channel: channel.id,
        Member: message.guild.memberCount,
      }).save();
    });
    message.channel.send(`Successfully created the member count channel.`)
    }
    
    module.exports.help = {
      aliases: ["create-counter-channel", "create-membercount-channel"],
      name: 'set-member-count',
      description: "Sets the membercount channel.",
      usage: '>set-member-count',
    };
    
    module.exports.config = {
      args: false,
      restricted: false,
      category: "Config",
      userPerms: ['MANAGE_CHANNELS'],
      disable: false,
      cooldown: 1000,
    };