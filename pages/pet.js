import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

// Este es el componente principal de nuestra aplicación
export default function Home() {
  // Definimos el estado para el input del animal y el resultado
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  // Esta función se ejecuta cuando el formulario se envía
  async function onSubmit(event) {
    event.preventDefault();
    // Verificamos que el input del animal no esté vacío
    if (animalInput.trim() === '') {
      // Si está vacío, simplemente retornamos y no hacemos nada
      return;
    }
    // Hacemos una solicitud a nuestra API para generar los nombres
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    // Obtenemos el resultado de la solicitud
    const data = await response.json();
    // Actualizamos el estado con el resultado
    setResult(data.result);
    // Limpiamos el input
    setAnimalInput("");
  }

  // Renderizamos el componente
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}