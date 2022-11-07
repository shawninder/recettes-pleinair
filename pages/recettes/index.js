import useTranslation from 'next-translate/useTranslation'
import Page from '../../components/Page'

import RecipeListItem from '../../components/RecipeListItem'
import { getAllRecipes } from '../../db/recipes'

import styles from '../../styles/Recipes.module.css'


export default function Recipes({ recipes }) {
  const { t } = useTranslation('recipes')

  const meta = {
    title: t('title'),
    desc: t('desc')
  }
  return (
    <Page meta={meta}>
      <div className={styles.recipes}>
        <h1>{t('title')}</h1>
        <ul>
          {recipes.map((recipe) => {
            return (
              <li key={recipe._id}>
                <RecipeListItem recipe={recipe} />
              </li>
            )
          })}
        </ul>
      </div>
    </Page>
  )
}

export async function getStaticProps() {
  return {
    props: {
      recipes: await getAllRecipes()
    }
  }
}
