import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!req.body || typeof req.body.animal !== 'string' || req.body.animal.length === 0) {
    res.status(400).json({ error: 'Animal must be a string and cannot be empty' });
    return;
  }

  const completion = await openai.createCompletion({
    model: "text-curie",
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}


function generatePrompt(animal) {
  if (typeof animal !== 'string' || animal.length === 0) {
    throw new Error('Animal must be a string and cannot be empty');
  }

  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  console.log(capitalizedAnimal);
  const suggestion = `Suggest four names for an animal that is a superhero.

  Animal: Cat
  Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline, Mica
  Animal: Dog
  Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot, Tiger
  Animal: ${capitalizedAnimal}
  Names:`;
  console.log(suggestion);
  return suggestion;
}
