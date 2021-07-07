
module.exports.run = async (client, message, args) => {
  const { Client, Message, MessageEmbed } = require("discord.js");
  const axios = require("axios");
  const reddit = require("../../models/reddit");
  switch (args[0]) {
    case "add":
      if (!args[1] || !args[2])
        return message.channel.send(
          "Incorrect usage! | `reddit <channel name> <subreddit name>`"
        );

      const channel = message.mentions.channels.first();
      if (!channel)
        return message.channel.send(
          "You must **mention** a channel to post to!"
        );

      const req = await axios(
        `https://www.reddit.com/r/${args[2]}/new.json?sort=new&limit=1`
      );
      if (req.data.data.dist === 0)
        return message.channel.send("Subreddit not found!");

      const data = await reddit.findOne({
        guildId: message.guild.id,
      });

      const subredditName = args[2];
      if (!data) {
        const newData = new reddit({
          guildId: message.guild.id,
          postedPosts: [],
          subreddits: { [subredditName]: [channel.id] },
          channelId: message.mentions.channels.first().id,
        });
        await newData.save();
      } else {
        if (Object.keys(data.subreddits).includes(subredditName))
          return message.channel.send("Subreddit is already autoposting!");
        data.subreddits[subredditName]
          ? data.subreddits[subredditName].push(channel.id)
          : (data.subreddits[subredditName] = [channel.id]);
        data.markModified("subreddits");
        await data.save();
      }

      setInterval(async () => {
        const req = await axios(
          `https://www.reddit.com/r/${args[2]}/new.json?sort=new&limit=1`
        );
        const reqData = req.data.data.children[0].data;
        const postId = reqData.id;

        const data = await reddit.findOne({
          guildId: message.guild.id,
        });

        if (data.postedPosts.includes(postId)) return;

        data.postedPosts.push(postId);
        data.markModified("postedPosts");

        Object.entries(data.subreddits).forEach(async (element) => {
          const channels = element[1];

          channels.forEach((channelId) => {
            const channel = message.guild.channels.cache.get(channelId);
            if (!channel) return;

            if (reqData.selftext === "") {
              channel.send(
                new MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle(reqData.title)
                  .setImage(reqData.url)
              );
            } else {
              channel.send(
                new MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle(reqData.title)
                  .setDescription(reqData.selftext)
              );
            }
          });
        });
        await data.save();
      }, 5000);

      return message.channel.send(
        `Successfully subscribed to the subreddit ${subredditName} in channel ${channel}!`
      );

      break;
    case "remove":
      if (!args[1])
        return message.channel.send(
          "Invalud usage! | `reddit remove <subreddit name>`"
        );
      const data1 = await reddit.findOne({
        guildId: message.guild.id,
      });
      if (!data1 || !data1.subreddits[args[1]]) {
        return message.channel.send(
          "You are not subscribed to that subreddit!"
        );
      } else {
        delete data1.subreddits[args[1]];
        data1.markModified("subreddits");
        await data1.save();
        return message.channel.send("Successfully unsubscribed!");
      }

    default:
      return message.channel.send(
        "Unknown subcommand! Valid ones are `add` or `remove`"
      );
  }
}

module.exports.help = {
  aliases: ['r'],
  name: 'reddit',
  description: '',
  usage: '>reddit <add/remove>',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'Fun',
  disable: false,
  userPerms: ['ADMINISTRATOR'],
  cooldown: 1000,
};