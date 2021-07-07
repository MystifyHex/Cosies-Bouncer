require("dotenv").config();

const Nova = require("./data/Nova");
const client = new Nova({ fetchAllMembers: true });

client.player.on("trackStart", (message, track) =>
  message.channel.send(
    `Now playing \`${track.title}\` requested by \`${track.requestedBy.tag}\`!`
  )
);

client.start(process.env.TOKEN, process.env.MONGO_URL);
