
module.exports = (client) => {
  client.emotes = {
    "money": ":moneybag:"
  }
  client.createButtonPagination = async function (array, message) {
    const dis = require('discord-buttons')

    function getRandomString(length) {
      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var result = '';
      for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
      }
      return result
    }
    let id1 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
    id2 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))
    id3 = (getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4) + '-' + getRandomString(4))

    let btn2;

    let btn1 = new dis.MessageButton().setLabel('\u200b').setEmoji('⬅️').setStyle('gray').setID(id1).setDisabled()

    if (array.length === 1) { btn2 = new dis.MessageButton().setLabel('\u200b').setEmoji('➡️').setStyle('gray').setID(id2).setDisabled() } else
      btn2 = new dis.MessageButton().setLabel('\u200b').setEmoji('➡️').setStyle('gray').setID(id2)

    let btn3 = new dis.MessageButton().setLabel('\u200b').setEmoji('🟥').setStyle('blurple').setID(id3)

    let row = new dis.MessageActionRow()
      .addComponent(btn1)
      .addComponent(btn2)
      .addComponent(btn3)
    let i = 0;
    let DaBaby = await message.channel.send(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })
    const gameFilter = m => m.clicker.user.id === message.author.id;
    const gameCollector = DaBaby.createButtonCollector(gameFilter);

    gameCollector.on('collect', btn => {
      btn.defer()
      if (btn.id === id1) {
        if (i === 1) {
          btn1 = new dis.MessageButton().setLabel('\u200b').setEmoji('⬅️').setStyle('gray').setID(id1).setDisabled()

          DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })
        }
        btn2 = new dis.MessageButton().setLabel('\u200b').setEmoji('➡️').setStyle('gray').setID(id2)
        row = new dis.MessageActionRow()
          .addComponent(btn1)
          .addComponent(btn2)
          .addComponent(btn3)
        i--;
        DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })
      } else if (btn.id === id2) {
        if (i === array.length - 2) {
          btn2 = new dis.MessageButton().setLabel('\u200b').setEmoji('➡️').setStyle('gray').setID(id2).setDisabled()

          DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })
        }
        btn1 = new dis.MessageButton().setLabel('\u200b').setEmoji('⬅️').setStyle('gray').setID(id1)
        i++;
        row = new dis.MessageActionRow()
          .addComponent(btn1)
          .addComponent(btn2)
          .addComponent(btn3)
        DaBaby.edit(`Page ${i + 1} / ${array.length}`, { embed: array[i], component: row })

      } else if (btn.id === id3) {
        DaBaby.delete()
        gameCollector.stop()
      }
    })
  }

  client.prefix = (id) => {
    return new Promise((resolve, reject) => {
      require('../models/Guild/schema').findOne({ guildID: message.guild.id })
        .lean()
        .exec()
        .then((data) => {
          if (data) {
            return resolve(data.prefix)
          }
          Schema.create({ id }).then(resolve).catch(reject);
        })
        .catch(reject);
    });
  }

}