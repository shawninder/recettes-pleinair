
import { useState } from 'react'

import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'

import If from '../utils/If'

import styles from '../styles/RecipePage.module.css'

function Component ({ portions, changePortion }) {
  return (
    <input type='text' placeholder={portions} onChange={changePortion} />
  )
}

export default function RecipePage ({ recipe }) {
  const { t } = useTranslation('recipe')
  const { name, img, alt, portions, ingredients, instructions } = recipe
  const [portion, setPortion] = useState(portions)

  function changePortion ({ target }) {
    const { value } = target
    setPortion(value || portions)
  }

  return (
    <div className={styles.recipe}>
      <If present={name} render={() => (
        <h1 className={styles.name}>{name}</h1>
      )} />
      <img className={styles.img} src={img} width={600} height={200} alt={alt || t('alt')} />
      <If present={ingredients} render={() => (
        <section className={styles.ingredients}>
          <h2>
            <span>{t('Ingredients')}</span>
            <If present={portions} render={() => (
              <span className={styles.portions}>
                <Trans i18nKey='recipe:portions' components={[
                  <Component key='recipe:portions' portions={portions} changePortion={changePortion} />
                ]} values={{ count: portions }} />
              </span>
            )} />
          </h2>
          <ul>
            {ingredients.map(([name, qty, unit], idx) => {
              return (
                <li key={`ingredients-${idx}`}>
                  <p className={styles.qty}>{Math.round((qty || 1) * (portion || 1) * 100) / 100}</p>
                  <p className={styles.unit}>{unit}</p>
                  <p className={styles.ingredientName}>{name}</p>
                </li>
              )
            })}
          </ul>
        </section>
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
