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