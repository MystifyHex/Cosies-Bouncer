module.exports = async (client) => {
  const reddit = require("../models/reddit");
  const birthdayModel = require("../models/birthday");
  const member = require("../models/member-count");
  const { MessageEmbed } = require("discord.js");
  const axios = require("axios");
  const cron = require("node-cron");
  console.log("Cosies Chairman is online!");
  console.log(`Running in ${client.guilds.cache.size} servers!`);
  client.user.setActivity("Cosies Videos", {
    type: "STREAMING",
    url: "https://www.twitch.tv/cosiesmc"
  });

  const redditData = await reddit.find();
  redditData.forEach((mongooseData) => {
    const guild = client.guilds.cache.get(mongooseData.guildId);
    setInterval(async () => {
      Object.entries(mongooseData.subreddits).forEach(async (element) => {
        const req = await axios(
          `https://www.reddit.com/r/${element[0]}/new.json?sort=new&limit=1`
        );
        const reqData = req.data.data.children[0].data;
        const postId = reqData.id;

        if (mongooseData.postedPosts.includes(postId)) return;

        mongooseData.postedPosts.push(postId);
        mongooseData.markModified("postedPosts");
        await mongooseData.save();

        const channels = element[1];

        channels.forEach((channelId) => {
          const channel = guild.channels.cache.get(channelId);
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
    }, 5000);
  });

  const birthdayData = await birthdayModel.find();
  birthdayData.forEach((mongooseData) => {
    const guild = client.guilds.cache.get(mongooseData.guildId);
    Object.entries(mongooseData.birthdays).forEach(async (element) => {
      const userId = element[0];
      const user = await guild.members.fetch(userId);

      const birthday = element[1];

      const birthdayParts = birthday.split("-");
      const day = birthdayParts[0];
      const month = birthdayParts[1];

      cron.schedule(`0 0 ${day} ${month} *`, async () => {
        const mongoData = await birthdayModel.findOne({
          guildId: guild.id,
        });
        if (!mongoData) {
          const newData = new birthdayModel({ guildId: guild.id });
          await newData.save();
          return user.send(
            `Happy birthday ${user.username} :tada: ! Please let one of the admins know that ${guild.name} doesn't have a birthday channel setup, and all birthday notifications are currently being dmed to the users. Use the command \`set-birthday-channel\` to set the channel.`
          );
        } else if (!mongoData.channelId) {
          return user.send(
            `Happy birthday ${user.username} :tada: ! Please let one of the admins know that ${guild.name} doesn't have a birthday channel setup, and all birthday notifications are currently being dmed to the users. Use the command \`set-birthday-channel\` to set the channel.`
          );
        } else {
          guild.channels.cache
            .get(mongoData.channelId)
            .send(`Happy birthday <@${user.id}> :tada:`);
        }
      });
    });
  });

  setInterval(() => {
    member.find().then((data) => {
      if (!data && !data.length) return;

      data.forEach((value) => {
        const guild = client.guilds.cache.get(value.Guild);
        const memberCount = guild.memberCount;

        if (value.Member != memberCount) {
          const channel = guild.channels.cache.get(value.Channel);
          channel.setName(`Members: ${memberCount}`);

          value.Member = memberCount;
          value.save();
        }
      });
    });
  }, 10000);
};
