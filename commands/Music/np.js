const { Client, Message, MessageEmbed } = require("discord.js");


module.exports.run = async (client, message, args) => {
    const track = client.player.nowPlaying(message);

    const embed = new MessageEmbed()
        .setAuthor("Currently playing")
        .setThumbnail(track.thumbnail)
        .addField("Title", track.title, true)
        .addField("Artist", track.author, true)
        .addField(
            "Description",
            track.description ? track.description.length > 150 ? track.description.substring(0, 150) + "\n" + "And more...".toLowerCase() : track.description : "No description", true
        )
        .addField(
            "\u200B",
            client.player.createProgressBar(message, {
                timecodes: true
            })
        )
        .setTimestamp()
        .setColor("#2F3136");

    return message.channel.send(embed);
}

module.exports.help = {
    aliases: ['np'],
    name: 'nowplaying',
    description: "Get the currently playing song in the queue",
    usage: '>nowplaying',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'Music',
    disable: false,
    userPerms: [],
    cooldown: 1000,
};