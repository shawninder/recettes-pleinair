import useTranslation from 'next-translate/useTranslation'

import RecipeListItem from './RecipeListItem'
import styles from '../styles/TOC.module.css'
import printStyles from '../styles/print.module.css'

export default function TOC ({ recipes }) {
  const { t } = useTranslation('toc')
  function Category ({ label, filter }) {
    const matches = recipes.filter(filter)
    return matches.length > 0 ? (
      <div>
        <h3>{label}</h3>
        <ul className={styles.recipeList}>
          {matches.map((recipe) => {
            return (
              <li className={styles.recipeListItem} key={recipe._id}>
                <RecipeListItem recipe={recipe} />
              </li>
            )
          })}
        </ul>
      </div>
    ) : null
  }
  return (
    <div className={styles.toc}>
      <h2 className={printStyles['print-only']}>{t('Table of Contents')}</h2>
      <Category label={t('Breakfasts')} filter={(recipe) => {
        return recipe.tags.indexOf('breakfast') !== -1 ? recipe : false
      }} />
      <Category label={t('Lunches')} filter={(recipe) => {
        return recipe.tags.indexOf('lunche') !== -1 ? recipe : false
      }} />
      <Category label={t('Suppers')} filter={(recipe) => {
        return recipe.tags.indexOf('supper') !== -1 ? recipe : false
      }} />
    </div>
  )
}
