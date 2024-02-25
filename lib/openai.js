import { Configuration, OpenAIApi } from "openai-edge";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("OpenAI API key is not set");
  throw new Error("OpenAI API key is missing");
}
const config = new Configuration({ apiKey });
const openai = new OpenAIApi(config);


export async function generateImagePrompt(location) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my trip app location banner image. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled",
        },
        {
          role: "user",
          content: `generate a thumbnail description for the location ${location}, your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled`,
        },
      ],
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating image prompt:", error);
    return null; // Returning null to indicate failure
  }
}

export async function generateImage(image_description) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "512x512",
    });

    const data = await response.json();
    console.log(data.data[0].url)
    return data.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    return null; // Returning null to indicate failure
  }
}