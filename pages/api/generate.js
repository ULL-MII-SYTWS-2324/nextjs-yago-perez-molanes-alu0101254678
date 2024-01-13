// Importamos las clases necesarias de la biblioteca de OpenAI
import { Configuration, OpenAIApi } from "openai";

// Configuramos la API de OpenAI con nuestra clave API
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Esta es la función que maneja las solicitudes a nuestra API
export default async function (req, res) {
  // Verificamos que la solicitud tenga un cuerpo y que contenga un animal como una cadena no vacía
  if (!req.body || typeof req.body.animal !== 'string' || req.body.animal.length === 0) {
    res.status(400).json({ error: 'Animal must be a string and cannot be empty' });
    return;
  }

  // Usamos la API de OpenAI para generar un texto basado en una indicación que incluye el animal
  const completion = await openai.createCompletion({
    model: "text-curie",
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
  });
  // Respondemos con el primer resultado de la generación de texto
  res.status(200).json({ result: completion.data.choices[0].text });
}

// Esta función genera la indicación para la API de OpenAI
function generatePrompt(animal) {
  // Verificamos que el animal sea una cadena no vacía
  if (typeof animal !== 'string' || animal.length === 0) {
    throw new Error('Animal must be a string and cannot be empty');
  }

  // Capitalizamos el nombre del animal
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  // Creamos la indicación
  const suggestion = `Suggest four names for an animal that is a superhero.

  Animal: Cat
  Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline, Mica
  Animal: Dog
  Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot, Tiger
  Animal: ${capitalizedAnimal}
  Names:`;

  // Devolvemos la indicación
  return suggestion;
}