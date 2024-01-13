import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

// Componente principal de la página
export default function Images() {
  // Define el estado para el input del texto y el resultado de la imagen
  const [textInput, setTextInput] = useState("");
  const [imageResult, setImageResult] = useState();

  // Función que se ejecuta cuando se envía el formulario
  async function onSubmit(event) {
    event.preventDefault();

    // Verifica que el input de texto no esté vacío
    if (textInput.trim() === '') {
      // Si está vacío, no hace nada
      return;
    }

    // Realiza una solicitud a la API para generar imágenes
    const response = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textInput }),
    });

    // Obtiene el resultado de la solicitud
    const data = await response.json();

    // Actualiza el estado con la URL de la imagen generada
    setImageResult(data.imageUrl);
  }

  // Renderiza el componente
  return (
    <div>
      <Head>
        <title>OpenAI Image Generator</title>
        {/* Puedes cambiar el ícono según tu preferencia */}
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Generador de Imágenes</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="textInput">Introduce un texto:</label>
          <input
            type="text"
            id="textInput"
            name="text"
            placeholder="Escribe algo..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button type="submit">Generar Imagen</button>
        </form>
        {imageResult && (
          <div className={styles.imageContainer}>
            <img src={imageResult} alt="Generated Image" className={styles.generatedImage} />
          </div>
        )}
      </main>
    </div>
  );
}
