const { Client, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!client.player.getQueue(message))
        return message.channel.send(
            "There is no music being played on this server!"
        );

    if (client.player.getQueue(message).paused) {
        // Don't touch, it's an annoying bug in discord player
        client.player.resume(message);
        client.player.pause(message);
        client.player.resume(message);
        return message.channel.send("Successfully **resumed** the music");
    } else {
        await client.player.pause(message);
        return message.channel.send("Successfully **paused** the music!");
    }
}

module.exports.help = {
    aliases: ['resume'],
    name: 'pause',
    description: 'Pause or resume the currently playing song.',
    usage: '>volume',
};

module.exports.config = {
    args: false,
    restricted: false,
    userPerms: [],
    category: 'Music',
    disable: false,
    cooldown: 1000,
};

