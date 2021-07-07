
    module.exports.run = async (client, message, args) => {
const { Client, Message, MessageEmbed } = require("discord.js");
const { FieldsEmbed } = require("discord-paginationembed");

    const queue = client.player.getQueue(message);
    if (!queue) return message.channel.send("No music currently playing");

    if (queue.tracks.length === 1) {
      const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setAuthor("Queue", message.guild.iconURL({ dynamic: true }))
        .setThumbnail(queue.tracks[0].thumbnail)
        .addField(
          "Currently Playing",
          `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`
        )
        .setFooter(
          "To remove the currently playing song from the queue, run `remove 0`"
        );
      return message.channel.send(embed);
    }
    let i = 0;

    const FieldEmbed = new FieldsEmbed();

    FieldEmbed.embed
      .setColor("#2F3136")
      .setThumbnail(queue.tracks[0].thumbnail)
      .setAuthor("Current queue", message.guild.iconURL({ dynamic: true }))
      .addField(
        "Currently Playing",
        `[${queue.tracks[0].title}](${queue.tracks[0].url})\n*Requested by ${queue.tracks[0].requestedBy}*\n`
      )
      .setFooter(
        "To remove the currently playing song from the queue, run `remove 0`"
      );

    FieldEmbed.setArray(
      queue.tracks[1] ? queue.tracks.slice(1, queue.tracks.length) : []
    )
      .setAuthorizedUsers([message.author.id])
      .setChannel(message.channel)
      .setElementsPerPage(5)
      .setPageIndicator(true)
      .formatField(
        "Queue",
        (track) =>
          `${++i}. [${track.title}](${track.url})\n*Requested by ${
            track.requestedBy
          }*\n`
      );

    FieldEmbed.build();
    }
    
    module.exports.help = {
      aliases: ['q'],
      name: 'queue',
      description: 'Get currency queue',
      usage: '>queue',
    };
    
    module.exports.config = {
      args: false,
      restricted: false,
      category: 'Music',
      disable: false,
      userPerms: [],
      cooldown: 1000,
    };