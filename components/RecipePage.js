import { createElement } from 'react'
import useTranslation from 'next-translate/useTranslation'

import If from '../utils/If'

import styles from '../styles/RecipePage.module.css'


export default function RecipePage ({ recipe }) {
  const { t } = useTranslation('recipe')
  const { name, portions, ingredients, instructions } = recipe

  return (
    <div className={styles.recipe}>
      <If present={name} render={() => (
        <h1 className={styles.name}>{name}</h1>
      )} />
      <If present={portions} render={() => (
        <p>
          {t('portions')}: {portions}
        </p>
      )} />
      <If present={ingredients} render={() => (
        <>
          <h2>{t('Ingredients')}</h2>
          <ul className={styles.ingredients}>
            {ingredients.map(([name, qty, unit], idx) => {
              return (
                <li key={`ingredients-${idx}`}>
                  <p className={styles.qty}>{qty}</p>
                  <p className={styles.unit}>{unit}</p>
                  <p className={styles.ingredientName}>{name}</p>
                </li>
              )
            })}
          </ul>
        </>
      )} />

      <ListSection steps={instructions?.advance} label={t('advance')} keyLabel='advance' />
      <ListSection steps={instructions?.transport} label={t('transport')} keyLabel='transport' />
      <ListSection steps={instructions?.prep} label={t('prep')} keyLabel='prep' />
      <ListSection steps={instructions?.serve} label={t('serve')} keyLabel='serve' />
    </div>
  )
}

function ListSection ({ steps, label, keyLabel }) {
  return (
    <If present={steps} render={() => (
      <>
        <h2>{label}</h2>
        <ol>
        {steps.map((item, idx) => {
          return <li key={`${keyLabel}-${idx}`}>
            {item}
          </li>
        })}
        </ol>
      </>
    )} />
  )
}
