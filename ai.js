const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");

const apiTokens = config({ path: ".env" }).parsed;
const openAi_token = apiTokens.openAiToken;
const configuration = new Configuration({
  apiKey: openAi_token,
});

const openai = new OpenAIApi(configuration);

async function ask(prompt) {
  //   const response = await openai.createCompletion({
  //     model: "davinci",
  //     // messages: [{ role: "user", content: prompt }],
  //     prompt,
  //     temperature: 0.7,
  //     max_tokens: 256,
  //     // top_p: 1,
  //     // frequency_penalty: 0,
  //     // presence_penalty: 0,
  //   });
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  const answer = response.data.choices[0].message;
  return answer;
}

module.exports = {
  ask,
};
