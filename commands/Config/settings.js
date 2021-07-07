const { Client, Message, MessageEmbed } = require("discord.js");
const guildSchema = require("../../models/Guild/schema");
const Util = require("utils-discord");

module.exports.run = async (client, message, args) => {
    const data = await Util.mongoFind(guildSchema, {
      guildID: message.guild.id,
    });
    
    const prefix = data.prefix;

    if (!args[0]) {
      let aRole;
      let mRole;
      let tMod;
      let wChan;
      let lChan;
      let auRole;
      let pFix;

      if (data.modRoleID !== null) {
        mRole = `<@&${data.modRoleID}>`;
      } else {
        mRole = `\`No role currently\``;
      }
        
      if (data.prefix !== null) {
        pFix = `${data.prefix}`
      } else {
          pFix = `\`For some reason there is no prefix! LMAO!`
      }

      if (data.adminRoleID !== null) {
        aRole = `<@&${data.adminRoleID}>`;
      } else {
        aRole = `\`No role currently\``;
      }

      if (data.autoRoleID !== null) {
        auRole = `<@&${data.autoRoleID}>`;
      } else {
        auRole = `\`No role currently\``;
      }

      if (data.welcomeChannelID !== null) {
        wChan = `<#${data.welcomeChannelID}>`;
      } else {
        wChan = `\`No channel currently\``;
      }

      if (data.logChannelID !== null) {
        lChan = `<#${data.logChannelID}>`;
      } else {
        lChan = `\`No channel currently\``;
      }

      if (data.boostChannelID !== null) {
        bChan = `<#${data.boostChannelID}>`;
      } else {
        bChan = `\`No channel currently\``;
      }

      let guildName = `${message.guild.name}'s`;
      if (message.guild.name.endsWith("s"))
        guildName = `${message.guild.name}'`;

      const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`**${guildName} Server Settings**`)
        .addField("__Admin Role__", aRole, true)
        .addField("__Mod Role__", mRole, true)
        .addField("__Auto Role__", auRole, true)
        .addField("__Welcome Channel__", wChan)
        .addField("__Logs Channel__", lChan)
        .addField("__Prefix__", pFix)
        .setFooter(
          `${prefix}settings [adminrole, modrole, logs, welcome, autorole]`
        )
        .setTimestamp();

      return message.channel.send(embed);
    }

    // Mod Role
    if (
      args[0].toLowerCase() === "mrole" ||
      args[0].toLowerCase() === "modrole"
    ) {
      if (!data) {
        data = await Util.mongoCreate(guildSchema, {
          guildID: message.guild.id,
          ownerRoleID: message.guild.ownerID,
          modRoleID: null,
          adminRoleID: null,
          autoRoleID: null,
          logChannelID: null,
          welcomeChannelID: null,
        });
      }

      let fRole;
      if (data.modRoleID !== null) {
        fRole = `<@&${data.modRoleID}>`;
      } else {
        fRole = `\`no role currently\``;
      }

      if (!args[1]) {
        const embed = new MessageEmbed()
          .setColor("#2F3136")
          .setDescription(`The current Mod Role is ${fRole}.`);

        return message.channel.send(embed);
      }

      let modRole = message.mentions.roles.first().id || args[1];

      data.modRoleID = modRole;

      Util.mongoSave(data);

      const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`<@&${modRole}> is now set as the \`Mod Role\`.`);

      message.channel.send(embed);
    }

    // Admin Role
    if (
      args[0].toLowerCase() === "arole" ||
      args[0].toLowerCase() === "adminrole"
    ) {
      if (!data) {
        data = await Util.mongoCreate(guildSchema, {
          guildID: message.guild.id,
          ownerRoleID: message.guild.ownerID,
          modRoleID: null,
          adminRoleID: null,
          autoRoleID: null,
          logChannelID: null,
          welcomeChannelID: null,
        });
      }

      let fRole;
      if (data.adminRoleID !== null) {
        fRole = `<@&${data.adminRoleID}>`;
      } else {
        fRole = `\`no role currently\``;
      }

      if (!args[1]) {
        const embed = new MessageEmbed()
          .setColor("#2F3136")
          .setDescription(`The current Admin Role is ${fRole}`);

        return message.channel.send(embed);
      }

      let adminRole = message.mentions.roles.first().id || args[1];

      data.adminRoleID = adminRole;

      Util.mongoSave(data);

      const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`<@&${adminRole}> is now set as the \`Admin Role\`.`);

      message.channel.send(embed);
    }

    //Trial Mod Role
    if (args[0].toLowerCase() === "autorole") {
      if (!data) {
        data = await Util.mongoCreate(guildSchema, {
          guildID: message.guild.id,
          ownerRoleID: message.guild.ownerID,
          modRoleID: null,
          adminRoleID: null,
          autoRoleID: null,
          logChannelID: null,
          welcomeChannelID: null,
        });
      }

      let fRole;
      if (data.tModID !== null) {
        fRole = `<@&${data.autoRoleID}>`;
      } else {
        fRole = `\`no role currently\``;
      }

      if (!args[1]) {
        const embed = new MessageEmbed()
          .setColor("#2F3136")
          .setDescription(`The current Auto Role is ${fRole}`);

        return message.channel.send(embed);
      }

      let autoRoles = message.mentions.roles.first().id || args[1];

      data.autoRoleID = autoRoles;

      Util.mongoSave(data);

      const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setDescription(
          `<@&${autoRoles}> is now set as the \`Trial Mod Role\`.`
        );

      message.channel.send(embed);
    }

    //Welcome Channel
    if (args[0].toLowerCase() === "welcome") {
      if (!data) {
        data = await Util.mongoCreate(guildSchema, {
          guildID: message.guild.id,
          ownerRoleID: message.guild.ownerID,
          modRoleID: null,
          adminRoleID: null,
          autoRoleID: null,
          logChannelID: null,
          welcomeChannelID: null,
        });
      }

      let fRole;
      if (data.welcomeChannelID !== null) {
        fRole = `<#${data.welcomeChannelID}>`;
      } else {
        fRole = `\`no channel currently\``;
      }

      if (!args[1]) {
        const embed = new MessageEmbed()
          .setColor("#2F3136")
          .setDescription(`The current Welcome Channel is ${fRole}`);

        return message.channel.send(embed);
      }

      let welcomeChan = message.mentions.channels.first().id || args[1];

      data.welcomeChannelID = welcomeChan;

      Util.mongoSave(data);

      const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setDescription(
          `<#${welcomeChan}> is now set as the \`Welcome Channel\`.`
        );

      message.channel.send(embed);
    }

    //Logs Channel
    if (args[0].toLowerCase() === "logs") {
      if (!data) {
        data = await Util.mongoCreate(guildSchema, {
          guildID: message.guild.id,
          ownerRoleID: message.guild.ownerID,
          modRoleID: null,
          adminRoleID: null,
          autoRoleID: null,
          logChannelID: null,
          welcomeChannelID: null,
        });
      }

      let fRole;
      if (data.logsChannelID !== null) {
        fRole = `<#${data.logsChannelID}>`;
      } else {
        fRole = `\`no channel currently\``;
      }

      if (!args[1]) {
        const embed = new MessageEmbed()
          .setColor("#2F3136")
          .setDescription(`The current Logs Channel is ${fRole}`);

        return message.channel.send(embed);
      }

      let logsChan = message.mentions.channels.first().id || args[1];

      data.logChannelID = logsChan;

      Util.mongoSave(data);

      const embed = new MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`<#${logsChan}> is now set as the \`Logs Channel\`.`);

      message.channel.send(embed);
    }
}

module.exports.help = {
  aliases: [],
  name: 'settings',
  description: "Sets the settings for the whole server.",
  usage: '>settings',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: "Config",
  userPerms: ['ADMINISTRATOR'],
  disable: false,
  cooldown: 1000,
};

