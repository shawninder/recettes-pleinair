import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const title = 'Recettes / Plein Air'
  const desc = "Recettes pour l'Expédition Gourmande"
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={desc} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>{title}</h1>
        <p className={styles.tagline}>{desc}</p>
        <p>Coming soon…</p>
      </main>
    </div>
  )
}
