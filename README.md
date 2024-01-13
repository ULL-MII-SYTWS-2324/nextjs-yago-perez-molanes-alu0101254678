[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13363951)

## Pasos seguidos en el desarrollo de la página
El objetivo de la práctica es desarrollar una aplicación web de nextjs destinada a generar nombres de animales, e imágenes
según el texto que introduca el usuario.

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


