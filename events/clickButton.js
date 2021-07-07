const Discord = require("discord.js");
const fs = require("fs");

const { MessageButton, MessageActionRow } = require("discord-buttons");

let btn1 = new MessageButton()
  .setLabel("Fun")
  .setID("fun")
  .setStyle("red")
  .setEmoji("🎮");
let btn2 = new MessageButton()
  .setLabel("Tickets")
  .setID("tickets")
  .setStyle("green")
  .setEmoji("🎫");
let btn3 = new MessageButton()
  .setLabel("Moderation")
  .setID("moderation")
  .setStyle("blurple")
  .setEmoji("⚒️");
let btn4 = new MessageButton()
  .setLabel("Config")
  .setID("config")
  .setStyle("gray")
  .setEmoji("💦");
let btn5 = new MessageButton()
  .setLabel("Music")
  .setID("music")
  .setStyle("red")
  .setEmoji("🎵");
let row = new MessageActionRow()
  .addComponent(btn1)
  .addComponent(btn2)
  .addComponent(btn3)
  .addComponent(btn4)
  .addComponent(btn5);

module.exports = async (client, btn) => {
  btn.clicker.fetch();
  await require("../models/tickets").findOne(
    { GuildID: btn.guild.id },
    async (err, data) => {
      if (btn.id === "fun") {
        btn.defer();
        const categoryArray = fs.readdirSync("./commands/");
        const category = categoryArray.filter((x) => x === "Fun").join("");
        const cmds = client.commands
          .filter(
            (x) => x.config.category.toLowerCase() === category.toLowerCase()
          )
          .map((cmd) => `\`${cmd.help.name}\``)
          .join(", ");

        const cmdsEmbed = new Discord.MessageEmbed()
          .setTitle(
            `${category.slice(0, 1).toUpperCase()}${category.slice(1)} Commands`
          )
          .setDescription(cmds)
          .setColor("RANDOM")
          .setFooter("Page 1/1");
        btn2 = new MessageButton()
          .setLabel("Tickets")
          .setID("tickets")
          .setStyle("green")
          .setEmoji("🎫");
        btn3 = new MessageButton()
          .setLabel("Moderation")
          .setID("moderation")
          .setStyle("blurple")
          .setEmoji("⚒️");
        btn4 = new MessageButton()
          .setLabel("Config")
          .setID("config")
          .setStyle("gray")
          .setEmoji("💦");
        btn5 = new MessageButton()
          .setLabel("Music")
          .setID("music")
          .setStyle("red")
          .setEmoji("🎵");
        btn1 = new MessageButton()
          .setLabel("Fun")
          .setID("fun")
          .setStyle("red")
          .setEmoji("🎮")
          .setDisabled(true);
        row = new MessageActionRow()
          .addComponent(btn1)
          .addComponent(btn2)
          .addComponent(btn3)
          .addComponent(btn4)
          .addComponent(btn5);
        btn.message.edit({ embed: cmdsEmbed, components: [row] });
      }
      if (btn.id === "config") {
        btn.defer();
        const categoryArray = fs.readdirSync("./commands/");
        const category = categoryArray.filter((x) => x === "Config").join("");
        const cmds = client.commands
          .filter(
            (x) => x.config.category.toLowerCase() === category.toLowerCase()
          )
          .map((cmd) => `\`${cmd.help.name}\``)
          .join(", ");

        const cmdsEmbed = new Discord.MessageEmbed()
          .setTitle(
            `${category.slice(0, 1).toUpperCase()}${category.slice(1)} Commands`
          )
          .setDescription(cmds)
          .setColor("RANDOM")
          .setFooter("Page 1/1");
        btn1 = new MessageButton()
          .setLabel("Fun")
          .setID("fun")
          .setStyle("red")
          .setEmoji("🎮");
        btn2 = new MessageButton()
          .setLabel("Tickets")
          .setID("tickets")
          .setStyle("green")
          .setEmoji("🎫");
        btn3 = new MessageButton()
          .setLabel("Moderation")
          .setID("moderation")
          .setStyle("blurple")
          .setEmoji("⚒️");
        btn5 = new MessageButton()
          .setLabel("Music")
          .setID("music")
          .setStyle("red")
          .setEmoji("🎵");
        btn4 = new MessageButton()
          .setLabel("Config")
          .setID("config")
          .setStyle("gray")
          .setEmoji("💦")
          .setDisabled(true);
        row = new MessageActionRow()
          .addComponent(btn1)
          .addComponent(btn2)
          .addComponent(btn3)
          .addComponent(btn4)
          .addComponent(btn5);
        btn.message.edit({ embed: cmdsEmbed, components: [row] });
      }
      if (btn.id === "music") {
        btn.defer();
        const categoryArray = fs.readdirSync("./commands/");
        const category = categoryArray.filter((x) => x === "Music").join("");
        const cmds = client.commands
          .filter(
            (x) => x.config.category.toLowerCase() === category.toLowerCase()
          )
          .map((cmd) => `\`${cmd.help.name}\``)
          .join(", ");

        const cmdsEmbed = new Discord.MessageEmbed()
          .setTitle(
            `${category.slice(0, 1).toUpperCase()}${category.slice(1)} Commands`
          )
          .setDescription(cmds)
          .setColor("RANDOM")
          .setFooter("Page 1/1");
        btn1 = new MessageButton()
          .setLabel("Fun")
          .setID("fun")
          .setStyle("red")
          .setEmoji("🎮");
        btn2 = new MessageButton()
          .setLabel("Tickets")
          .setID("tickets")
          .setStyle("green")
          .setEmoji("🎫");
        btn3 = new MessageButton()
          .setLabel("Moderation")
          .setID("moderation")
          .setStyle("blurple")
          .setEmoji("⚒️");
        btn4 = new MessageButton()
          .setLabel("Config")
          .setID("config")
          .setStyle("gray")
          .setEmoji("💦");
        btn5 = new MessageButton()
          .setLabel("Music")
          .setID("music")
          .setStyle("red")
          .setEmoji("🎵")
          .setDisabled(true);
        row = new MessageActionRow()
          .addComponent(btn1)
          .addComponent(btn2)
          .addComponent(btn3)
          .addComponent(btn4)
          .addComponent(btn5);
        btn.message.edit({ embed: cmdsEmbed, components: [row] });
      }
      if (btn.id === "moderation") {
        btn.defer();
        const categoryArray = fs.readdirSync("./commands/");
        const category = categoryArray
          .filter((x) => x === "Moderation")
          .join("");
        const cmds = client.commands
          .filter(
            (x) => x.config.category.toLowerCase() === category.toLowerCase()
          )
          .map((cmd) => `\`${cmd.help.name}\``)
          .join(", ");

        const cmdsEmbed = new Discord.MessageEmbed()
          .setTitle(
            `${category.slice(0, 1).toUpperCase()}${category.slice(1)} Commands`
          )
          .setDescription(cmds)
          .setColor("RANDOM")
          .setFooter("Page 1/1");
        btn1 = new MessageButton()
          .setLabel("Fun")
          .setID("fun")
          .setStyle("red")
          .setEmoji("🎮");
        btn2 = new MessageButton()
          .setLabel("Tickets")
          .setID("tickets")
          .setStyle("green")
          .setEmoji("🎫");
        btn4 = new MessageButton()
          .setLabel("Config")
          .setID("config")
          .setStyle("gray")
          .setEmoji("💦");
        btn5 = new MessageButton()
          .setLabel("Music")
          .setID("music")
          .setStyle("red")
          .setEmoji("🎵");
        btn3 = new MessageButton()
          .setLabel("Moderation")
          .setID("moderation")
          .setStyle("blurple")
          .setEmoji("⚒️")
          .setDisabled(true);
        row = new MessageActionRow()
          .addComponent(btn1)
          .addComponent(btn2)
          .addComponent(btn3)
          .addComponent(btn4)
          .addComponent(btn5);
        btn.message.edit({ embed: cmdsEmbed, components: [row] });
      }
      if (btn.id === "tickets") {
        btn.defer();
        const categoryArray = fs.readdirSync("./commands/");
        const category = categoryArray.filter((x) => x === "Tickets").join("");
        const cmds = client.commands
          .filter(
            (x) => x.config.category.toLowerCase() === category.toLowerCase()
          )
          .map((cmd) => `\`${cmd.help.name}\``)
          .join(", ");

        const cmdsEmbed = new Discord.MessageEmbed()
          .setTitle(
            `${category.slice(0, 1).toUpperCase()}${category.slice(1)} Commands`
          )
          .setDescription(cmds)
          .setColor("RANDOM")
          .setFooter("Page 1/1");
        btn1 = new MessageButton()
          .setLabel("Fun")
          .setID("fun")
          .setStyle("red")
          .setEmoji("🎮");
        btn3 = new MessageButton()
          .setLabel("Moderation")
          .setID("moderation")
          .setStyle("blurple")
          .setEmoji("⚒️");
        btn4 = new MessageButton()
          .setLabel("Config")
          .setID("config")
          .setStyle("gray")
          .setEmoji("💦");
        btn5 = new MessageButton()
          .setLabel("Music")
          .setID("music")
          .setStyle("red")
          .setEmoji("🎵");
        btn2 = new MessageButton()
          .setLabel("Tickets")
          .setID("tickets")
          .setStyle("green")
          .setEmoji("🎫")
          .setDisabled(true);
        row = new MessageActionRow()
          .addComponent(btn1)
          .addComponent(btn2)
          .addComponent(btn3)
          .addComponent(btn4)
          .addComponent(btn5);
        btn.message.edit({ embed: cmdsEmbed, components: [row] });
      }
      if (!data || typeof data == null) return;

      if (btn.id === data.IDCreate) {
        if (data.UsedBy.includes(btn.clicker.user.id))
          return btn.reply.send("You already claimed a ticket.", true);
        btn.defer();
        let c = await btn.message.guild.channels.create(
          `ticket-${btn.clicker.user.tag}`,
          {
            permissionOverwrites: [
              {
                id: btn.clicker.user.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
              {
                id: btn.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"],
              },
              {
                id: client.user.id,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              },
              {
                id: data.modRole,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              },
            ],
            type: "text",
          }
        );
        c.send(`<@${btn.clicker.user.id}><@&${data.modRole}>`, {
          embed: {
            title: "Support ticket.",
            description:
              "I've created a ticket for you, feel free to ask staff for support!",
          },
          components: [
            new MessageActionRow()
              .addComponent(
                new MessageButton()
                  .setID(data.IDClose)
                  .setLabel("Cancel")
                  .setEmoji("🗑️")
                  .setStyle("blurple")
              )
              .addComponent(
                new MessageButton()
                  .setID(data.IDDelete)
                  .setLabel("Delete")
                  .setEmoji("💣")
                  .setStyle("red")
              ),
          ],
        });
        data.UsedBy.push(btn.clicker.user.id);
        data.save();
      }
      if (btn.id === data.IDClose) {
        btn.defer();
        btn.message.channel
          .updateOverwrite(btn.clicker.user, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            ATTACH_FILES: false,
            READ_MESSAGE_HISTORY: false,
          })
          .then(() => {
            btn.message.channel.send(
              `${btn.message.channel} has been closed!`,
              {
                components: [
                  new MessageActionRow()
                    .addComponent(
                      new MessageButton()
                        .setID(data.IDDelete)
                        .setLabel("Delete")
                        .setEmoji("💣")
                        .setStyle("red")
                    )
                    .addComponent(
                      new MessageButton()
                        .setID(data.IDTranscript)
                        .setLabel("Transcript")
                        .setEmoji("📜")
                        .setStyle("blurple")
                    ),
                ],
              }
            );
          });
      }
      if (btn.id === data.IDDelete) {
        if (!btn.clicker.member.permissions.has("MANAGE_CHANNELS"))
          return btn.reply.send(
            "You need `MANAGE_CHANNELS` permission for this.",
            true
          );
        btn.defer();
        btn.message.channel.send(`Deleting in 5s...`);

        let posc = data.UsedBy.indexOf(data.UsedBy[btn.clicker.member.id]);
        data.UsedBy.splice(posc, 1);
        data.save();
        setTimeout(() => {
          btn.message.channel.delete();
        }, 5000);
      }
      if (btn.id === data.IDTranscript) {
        btn.defer();
        const sourcebin = require("sourcebin_js");
        const { MessageEmbed } = require("discord.js");

        btn.message.channel.messages.fetch().then(async (messages) => {
          const output = messages
            .array()
            .reverse()
            .map(
              (m) =>
                `${new Date(m.createdAt).toLocaleString("en-US")} - ${
                  m.author.tag
                }: ${
                  m.attachments.size > 0
                    ? m.attachments.first().proxyURL
                    : m.content
                }`
            )
            .join("\n");

          let response;
          try {
            response = await sourcebin.create(
              [
                {
                  name: " ",
                  content: output,
                  languageId: "text",
                },
              ],
              {
                title: `Chat transcript | ${btn.message.channel.name}`,
                description: " ",
              }
            );
          } catch (e) {
            console.log(e);
            return btn.message.channel.send("An error occurred!");
          }

          const embed = new MessageEmbed()
            .setDescription(
              `[\`Chat transcript | ${btn.message.channel.name}\`](${response.url})`
            )
            .setColor("RANDOM");
          btn.message.guild.channels.cache
            .get(data.transcriptChannel)
            .send(embed);
        });
      }
    }
  );
};
