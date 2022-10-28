import Head from 'next/head'

import RecipeListItem from '../components/RecipeListItem'
import { getAllRecipes } from '../db/recipes'

import styles from '../styles/Home.module.css'

export default function Home ({ texts, recipes }) {
  const { title, desc } = texts
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
        <ul>
          {recipes.map((recipe) => {
            return (
              <li key={recipe._id}>
                <RecipeListItem recipe={recipe} />
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

const textsByLocale = {
  fr: {
    title: 'Recettes / Plein Air',
    desc: "Recettes pour l'Expédition Gourmande"
  }
}

export async function getStaticProps ({ locale }) {
  const texts = textsByLocale[locale]
  return {
    props: {
      texts,
      recipes: await getAllRecipes()
    }
  }
}
