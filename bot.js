require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const WEBHOOK_URL = process.env.WEBHOOK_URL;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.mentions.has(client.user)) {
    try {
      await axios.post(WEBHOOK_URL, {
        content: message.content,
        channel_id: message.channel.id,
      });
    } catch (err) {
      console.error(err);
    }
  }
});

client.login(process.env.API_KEY);
