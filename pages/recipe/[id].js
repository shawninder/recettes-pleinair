import Head from 'next/head'
import { getRecipe } from '../../db/recipes'

export default function RecipePage({ recipe }) {
  const { name } = recipe
  return (
    <div>
      <Head>
        <title>{name}</title>
        <meta name='description' content={name} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { id } = params
  return {
    props: {
      recipe: await getRecipe(id)
    }
  }
}

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
