[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13363951)

## Pasos seguidos en el desarrollo de la página
El objetivo de la práctica es desarrollar una aplicación web de nextjs destinada a generar nombres de animales, e imágenes según el texto que introduca el usuario.
[Éste](https://ull-mii-sytws.github.io/assets/practicas/nextjs/nextjs-2022.html#exercise-deploy-the-app-to-vercel) es el enunciado completo.


EL ESQUELETO DE CÓDIGO ESTÁ HECHO PERO NO FUNCIONA PORQUE TENEMOS UNA CUENTA GRATUITA DE OPENAI

### Primeros pasos
En el siguiente [enlace](https://ull-mii-sytws.github.io/openai-first-steps/#creating-an-account)
se pueden observar los primeros pasos realizados. Básicemente, se ha creado una clave de API de OpenAI.

![Generar api key](./docs/images/generate-api-key.png)

### Setup
Ahora seguimos con la infraestructura y la ejecuión del código. Para ello podemos seguir el siguiente [documento](https://ull-mii-sytws.github.io/nextjs/setup-and-run/) 

![Estructura del proyecto](./docs/images/project-structure.png)
Esa sería la infraestructura del proyecto, luego tenemos que instalar las dependencias con npm install, y,
posteriormente ejecutar la aplicación con npm run edv

```sh
npm install
npm run dev
```

Y si accedemos a la url generada veremos algo como lo siguiente.
![Estructura del proyecto](./docs/images/exmaple-execution.png)

También podemos seguir este [tutorial](https://github.com/ULL-MII-SYTWS/nextjs-solution/) para crear la infraestructura básica del proyecto.

### Desarrollo web con NextJS
Esta [parte](https://ull-mii-sytws.github.io/web-development-with-nextjs/#single-page-applications) sirve solamente como teoría para entender como funciona NextJS.

### Despliegue en Netlify
Ahora pasamos a desplegar nuestra app en un entorno de producción. En este caso, se ha elegido Netlify para desplegar la aplicación. Para ello podemos seguir los pasos de este [tutorial](https://ull-mii-sytws.github.io/nextjs/netlify-deployment/#deploy-at-netlify-with-the-ui).

![Despliegue en Netlify 1](./docs/images/deploy-netlify-1.png)
![Despliegue en Netlify 2](./docs/images/deploy-netlify-2.png)

Podemos acceder al sitio web desplegadao desde la plataforma Netelify.

El despliegue también se puede realizar con Netlify CLI.

```sh
npm install netlify-cli -g
```

Luego tenemos que hacer el proceso de linkear el proyecto local al proyecto que está en Netlify, (cuando hicimos nuestro primer despliegue) (hay que especificar un nombre del repo remoto)

```sh
ntl link --gitRemoteName sytws
```

Luego para comprobar el estado del proyecto de netlify
```sh
ntl status
```

Podemos ver el sitio de forma local usando el siguiente comando:
```sh
ntl dev
```
Y también podemos hacer el despliegue hacia la plataforma para verlo en la nube:
```sh
ntl deploy --prod
```

### Ejercicio: Obtener imágenes desde OpenAI
Vamos a realizar los siguientes ejercicios:

Añade rutas a la aplicación:
*   En la primra ruta /pet aloja el servicio actual
*   En una segunda ruta /image añade la funcionalidad para obtener una imagen de OpenAI y mostrarla
en la página.
*   Actualiza la página de inicio y los enlaces de navegación.
*   Añade una página de error 404.
*   Considera la opportunidad de resolverlo usando rutas dinámicas.

Éstos son los códigos desarrollados:

#### index.js
```js
import Link from 'next/link';
import styles from "./index.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h3>¡Bienvenido!</h3>
        <div>
          <div>
            <Link href="/pet">Generador de nombres de animales</Link>
          </div>
          <div>
            <Link href="/images">Generador de imágenes</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
```
#### 404.js
```js
function Custom404() {
    return <h1>404 - Página no encontrada</h1>
  }
  
  export default Custom404;
```
#### pet.js
```js
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
```
#### images.js
```js
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
```
Hasta ahora se ha mostrado únicamente las páginas, pero ahora mostramos los endpoints(también se dispone de un fichero de estilos pero no es tan relevante)

#### generate.js
```js
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
```
#### generateImage.js
```js
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
    });

    // Responde con la URL de la imagen generada
    res.status(200).json({ imageUrl: generation.data.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```
Para la generación de imágenes por asistencia artificial se ha usado el modelo dall-e-3.
![Modelo Inteligencia Artificial](./docs/images/model-openai.png)

[Referncia](https://platform.openai.com/docs/api-reference/images/create) de la API.
![Referencia de la API](./docs/images/api-reference.png)

Ahora pasamos a mostrar las funcionalidades creadas con capturas sobre el despliegue de la aplicación en Netlify.

#### RECORDEMOS QUE LA APLICACIÓN NO VA A FUNCIONAR PORQUE LA API KEY NO ES VÁLIDA, PORQUE TENEMOS UNA CUENTA GRATIUTA

![Funcionalidad 1](./docs/images/functionallity-1.png)
![Funcionalidad 2](./docs/images/functionallity-2.png)
![Funcionalidad 3](./docs/images/functionallity-3.png)

