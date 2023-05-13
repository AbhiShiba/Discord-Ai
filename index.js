const { config } = require("dotenv");
const { Client, GatewayIntentBits } = require("discord.js");
const { ask } = require("./ai.js");

const apiTokens = config({ path: ".env" }).parsed;
const discord_token = apiTokens.discordToken;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

const getData = async (text) => {
  const res = await ask(text);

  return res.content;
  // console.log(res.content);
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  const prefix = message.content.charAt(0);
  const msg = message.content.slice(1);
  if (prefix === ">") {
    // console.log(await getData(msg));
    await message.reply({
      content: await getData(msg),
    });
    // message.reply(response.data.choices[0].text);
  }
});

client.login(discord_token);
