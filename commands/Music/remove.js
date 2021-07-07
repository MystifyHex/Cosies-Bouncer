const { Client, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const queue = client.player.getQueue(message);

  if (!queue) {
    return message.channel.send("No music currently playing!");
  }

  if (!args[0] || isNaN(parseInt(args[0]))) {
    return message.channel.send(
      "Incorrect usage! | `remove <number of song in queue>`"
    );
  }

  const removed = client.player.remove(message, parseInt(args[0]));
  if (!removed) {
    return message.channel.send("Could not find that track in the queue");
  }

  message.channel.send(
    `Successfully removed \`${removed.title}\` from the queue`
  );

  if (!queue.tracks[0]) {
    client.player.stop(message);
    return message.channel.send(
      "Music stopped as there is no more music in the queue"
    );
  }
}

module.exports.help = {
  aliases: [],
  name: 'remove',
  description: 'Remove a song from the queue.',
  usage: '>remove <name or url>',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Music',
  disable: false,
  userPerms: [],
  cooldown: 1000,
};
