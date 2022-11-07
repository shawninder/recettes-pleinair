import { useCallback, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { getAllRecipes } from '../db/recipes'

import Page from '../components/Page'
import Cover from '../components/Cover'
import FrontCover from '../components/FrontCover'
import BackCover from '../components/BackCover'
import Spine from '../components/Spine'
import Search from '../components/Search'

function useRecipes (recipes) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
  const filterRecipes = useCallback((query) => {
    setFilteredRecipes(recipes.filter((recipe) => {
      return query.toLowerCase() === recipe.name.substring(0, query.length).toLowerCase() ? recipe : false
    }))
  }, [recipes, setFilteredRecipes])
  return {
    filteredRecipes,
    filterRecipes
  }
}

export default function Home ({ recipes }) {
  const { query, push } = useRouter()
  const { t } = useTranslation('app')
  const { filteredRecipes, filterRecipes } = useRecipes(recipes)
  const { q } = query
  const qStr = q || ''
  useEffect(() => {
    filterRecipes(qStr)
  }, [qStr, filterRecipes])

  function onSearch (queryStr) {
    push({ query: { q: encodeURIComponent(queryStr) } })
  }

  const meta = {
    title: t('name'),
    desc: t('desc')
  }

  return (
    <Page meta={meta}>
      <Cover>
        <Search filteredRecipes={filteredRecipes} onSearch={onSearch} query={decodeURIComponent(qStr)} />
        <FrontCover />
        <Spine />
        <BackCover />
      </Cover>
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
