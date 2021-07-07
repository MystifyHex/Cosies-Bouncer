const Schema = require("../models/Guild/schema");
const guildSchema = require("../models/Guild/schema");
const { formatDate } = require("../data/functions");
const { passGen } = require("ultrax");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const ultrax = require("ultrax");

module.exports = (client, member) => {
  Schema.findOne({ guildID: member.guild.id }, async (e, data) => {
    if (!data) return;
    let bg =
      "https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png";

    // defining the member's avatar with "PNG" as format.
    let avatar = member.user.displayAvatarURL({ format: "png" });

    // defining text_1 (title)
    let text1 = "Welcome";

    // defining text_2 (subtitle)
    let text2 = member.user.tag;

    // defining text_3 (footer)
    let text3 = `You're the ${member.guild.memberCount}th member`;

    // defining the color, here its white
    let color = "#ffffff";

    let options = {
      attachmentName: `Welcome`
    }

    // creating the image
    const image = await ultrax.welcomeImage(
      bg,
      avatar,
      text1,
      text2,
      text3,
      color,
      options
    );

    const channel = client.channels.cache.get(data.welcomeChannelID);
    channel.send(image);
  });
    Schema.findOne({ guildID: member.guild.id }, async (e, data) => {
      if (!data) return;

      const created = formatDate(member.user.createdAt);

      const channel = client.channels.cache.get(data.logChannelID);
      const Joined = new MessageEmbed()
        .setAuthor("Member Joined", member.user.displayAvatarURL())
        .setDescription(
          `${member.user} ${member.user.username}#${member.user.discriminator}`
        )
        .setColor("#43B582")
        .setFooter(member.user.id)
        .setTimestamp()
        .addField("**Account Age**", created);
      channel.send(Joined);
    });

    Schema.findOne({ guildID: member.guild.id }, async (e, data) => {
      member.roles.add(data.autoRoleID);
    });
};
