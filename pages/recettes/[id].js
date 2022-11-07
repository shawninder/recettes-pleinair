import Page from '../../components/Page'

import { getRecipe } from '../../db/recipes'

import RecipePage from '../../components/RecipePage'

export default function RecipeStandalonePage({ recipe }) {

  const { name } = recipe

  return (
    <Page
      locale='fr'
      meta={{
        title: name,
        desc: 'Une recette de recettespleinair.org'
      }}
    >
      <RecipePage recipe={recipe} />
    </Page>
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
