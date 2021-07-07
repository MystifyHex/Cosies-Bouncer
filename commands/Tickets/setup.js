module.exports.run = async (client, message, args, utils, data) => {
  const Discord = require("discord.js");
  const rr = {};
  let buttonz;
  const tickets = require("../../models/tickets");

  function getRandomString(length) {
    var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  const randomy =
    getRandomString(4) +
    "-" +
    getRandomString(4) +
    "-" +
    getRandomString(4) +
    "-" +
    getRandomString(4);
  const randomy1 =
    getRandomString(4) +
    "-" +
    getRandomString(4) +
    "-" +
    getRandomString(4) +
    "-" +
    getRandomString(4);
  const randomy2 =
    getRandomString(4) +
    "-" +
    getRandomString(4) +
    "-" +
    getRandomString(4) +
    "-" +
    getRandomString(4);
  const randomy3 =
    getRandomString(4) +
    "-" +
    getRandomString(4) +
    "-" +
    getRandomString(4) +
    "-" +
    getRandomString(4);

  const title = new Discord.MessageEmbed()
    .setTitle("Ticket SetUp - 1")
    .setDescription("Please send the embed title.")
    .setFooter("Type stop to cancel")
    .setColor("RANDOM");
  const color = new Discord.MessageEmbed()
    .setTitle("Ticket SetUp - 2")
    .setDescription("Please send the embed color.")
    .setFooter("Type stop to cancel")
    .setColor("RANDOM");
  const description = new Discord.MessageEmbed()
    .setTitle("Ticket SetUp - 3")
    .setDescription("Please send the embed description.")
    .setFooter("Type stop to cancel")
    .setColor("RANDOM");
  const labelButton = new Discord.MessageEmbed()
    .setTitle("Ticket SetUp - 4")
    .setDescription("Please send the button text.")
    .setFooter("Type stop to cancel")
    .setColor("RANDOM");
  const emojiButton = new Discord.MessageEmbed()
    .setTitle("Ticket SetUp - 5")
    .setDescription(
      "Please send the button emoji (optional, type `no` to skip)."
    )
    .setFooter("Type stop to cancel")
    .setColor("RANDOM");

  const buttonColor = new Discord.MessageEmbed()
    .setTitle("Ticket SetUp - 6")
    .setDescription(
      "Please send the button color (`red`, `gray`, `blurple`, `green`)."
    )
    .setFooter("Type stop to cancel")
    .setColor("RANDOM");
  const modRole = new Discord.MessageEmbed()
    .setTitle("Ticket SetUp - 7")
    .setDescription("Please send the mod role (ping/id).")
    .setFooter("Type stop to cancel")
    .setColor("RANDOM");
  const transcriptChannel = new Discord.MessageEmbed()
    .setTitle("Ticket SetUp - 8")
    .setDescription("Please send the transcripts logs channel (ping/id).")
    .setFooter("Type stop to cancel")
    .setColor("RANDOM");
  const channel = new Discord.MessageEmbed()
    .setTitle("Ticket SetUp - 9")
    .setDescription("Channel, you can use `#channel` or `CHANNEL_ID`.")
    .setFooter("Type stop to cancel")
    .setColor("RANDOM");
  let d = tickets.findOne({ GuildID: message.guild.id });
  if (d.GuildID)
    return message.reply("This server already has a ticket system!");
  let msg = await message.channel.send(title);
  let step = 0;
  const filter = (m) => m.author.id === message.author.id;
  const collector = message.channel.createMessageCollector(filter);
  collector.on("collect", async (stuff) => {
    if (
      stuff.content.toLowerCase() === "stop" ||
      stuff.content.toLowerCase() === "close" ||
      stuff.content.toLowerCase() === "cancel"
    ) {
      stuff.channel.send("Stopped.");
      return collector.stop();
    }
    step += 1;
    if (step == 1) {
      rr.title = stuff.content;
      return (msg = await message.channel.send(color));
    } else if (step === 2) {
      rr.color = stuff.content;
      return (msg = await message.channel.send(description));
    } else if (step === 3) {
      rr.description = stuff.content;
      return (msg = await message.channel.send(labelButton));
    } else if (step === 4) {
      rr.label = stuff.content;
      return (msg = await message.channel.send(emojiButton));
    } else if (step === 5) {
      const emoji = stuff.content;
      let custom = Discord.Util.parseEmoji(emoji);
      if (["no", "false", "skip"].includes(stuff.content)) {
        return (msg = await message.channel.send(buttonColor));
      } else if (custom !== undefined) {
        const { parse } = require("twemoji-parser");

        if (custom.id) {
          let parsed = client.emojis.cache.get(custom.id);

          if (!parsed) {
            return message.channel.send("Invalid emoji...");
          }
          rr.emoji = parsed.id;
          return (msg = await message.channel.send(buttonColor));
        } else {
          let parsed = parse(emoji);
          if (!parsed[0]) {
            collector.stop();
            return message.channel.send("Invalid emoji...");
          }
          rr.emoji = parsed[0].text;
          return (msg = await message.channel.send(buttonColor));
        }
      } else {
        return message.channel.send("Invalid emoji.");
      }
    } else if (step === 6) {
      if (
        !["green", "gray", "red", "blurple"].includes(
          stuff.content.toLowerCase()
        )
      )
        return stuff.channel.send("Invalid color.");

      rr.colorButton = stuff.content;
      return (msg = await message.channel.send(modRole));
    } else if (step === 7) {
      const role =
        stuff.guild.roles.cache.get(stuff.content) ||
        stuff.mentions.roles.first();
      if (!role) {
        stuff.reply("Invalid role.");
        return collector.stop();
      }
      rr.modRole = role.id;
      return (msg = await message.channel.send(transcriptChannel));
    } else if (step === 8) {
      const channe =
        message.guild.channels.cache.get(stuff.content) ||
        stuff.mentions.channels.first();
      if (!channe) {
        stuff.reply("Invalid channel.");
        return collector.stop();
      }
      rr.transcriptChannel = channe.id;
      return (msg = await message.channel.send(channel));
    } else if (step === 9) {
      const channel =
        message.guild.channels.cache.get(stuff.content) ||
        stuff.mentions.channels.first();

      if (!channel) {
        stuff.reply("Invalid channel.");
        collector.stop();
      }
      rr.channel = channel;
      const embed = new Discord.MessageEmbed()
        .setTitle(rr.title)
        .setDescription(rr.description)
        .setColor(rr.color);
      const disbut = require("discord-buttons");
      buttonz = new disbut.MessageButton()
        .setStyle(rr.colorButton)
        .setLabel(rr.labelButton)
        .setID(randomy);
      if (rr.emoji !== undefined) {
        buttonz = new disbut.MessageButton()
          .setStyle(rr.colorButton)
          .setLabel(rr.label)
          .setID(randomy)
          .setEmoji(rr.emoji);
      }
      try {
        var sending = await rr.channel.send({
          embed: embed,
          component: buttonz,
        });
      } catch (e) {
        if (sending) {
          sending.delete();
          return message.channel.send(
            "Whoopsie poopsie! Error while setting up, make sure i have permission!"
          );
        }
        return message.channel.send(
          "Whoopsie poopsie! Error while setting up, make sure i have permission!"
        );
      }
      const embed2 = new Discord.MessageEmbed()
        .setDescription(
          `Alright ticket setted up. Click [here](https://discord.com/channels/${message.guild.id}/${rr.channel.id}/${sending.id}) to jump to it!`
        )
        .setColor("BLUE");

      message.channel.send(embed2);
      await new tickets({
        GuildID: message.guild.id,
        IDCreate: randomy,
        IDClose: randomy1,
        IDDelete: randomy2,
        IDTranscript: randomy3,
        modRole: rr.modRole,
        transcriptChannel: rr.transcriptChannel,
        UsedBy: [],
      }).save();
      collector.stop();
    }
  });
};

module.exports.help = {
  aliases: [],
  name: "setup",
  description: "setup tickets",
  usage: ">setup",
};

module.exports.config = {
  args: false,
  restricted: false,
  category: "Tickets",
  disable: false,
  userPerms: ["MANAGE_GUILD"],
  cooldown: 10000,
};
