import { Configuration, OpenAIApi } from "openai";

// Configura la API de OpenAI con tu clave API
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Maneja las solicitudes a la API para generar imágenes
export default async function (req, res) {
  try {
    // Verifica que el cuerpo de la solicitud tenga el campo 'text'
    if (!req.body || typeof req.body.text !== 'string' || req.body.text.trim() === '') {
      res.status(400).json({ error: 'Text must be a non-empty string in the request body' });
      return;
    }

    // Utiliza la API de OpenAI para generar una imagen con DALL-E 2 (o el modelo que prefieras)
    const generation = await openai.images.generate({
      model: "dall-e-3", // Ajusta según el modelo específico de DALL-E 2
      prompt: req.body.text, // Utiliza el texto proporcionado por el usuario como prompt
      // Puedes agregar más configuraciones según la documentación de OpenAI
    });

    // Responde con la URL de la imagen generada
    res.status(200).json({ imageUrl: generation.data.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
