import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import Page from '../components/Page'

import Preview from '../components/Preview'
import { getAllRecipes } from '../db/recipes'

import styles from '../styles/Book.module.css'


export default function Book ({ recipes }) {
  const { t: appT } = useTranslation('app')
  const { t } = useTranslation('book')

  const meta = {
    title: t('title', { appName: appT('name')}),
    desc: t('desc')
  }
  return (
    <Page meta={meta}>
      <main className={styles.main}>
        <section className={styles.controls}>
          <form>
            <fieldset className={styles.bookContents}>
              <legend>{t('Book Contents')}</legend>
              <label>
                <input type='checkbox' /> {t('Breakfasts')}
              </label>
              <label>
                <input type='checkbox' /> {t('Lunches')}
              </label>
              <label>
                <input type='checkbox' /> {t('Suppers')}
              </label>
              <br />
              <label>
                {t('Number of Recipes')}: <input type='text' />
              </label>
            </fieldset>
            <fieldset className={styles.recipeContents}>
              <legend>{t('Recipe Contents')}</legend>
              <label>
                <input type='checkout' /> {t('Nutritive Information')}
              </label>
            </fieldset>
          </form>
        </section>
        <section className={styles.preview}>
          {/* <label>
            <input type='checkbox' /> Aperçu en temps-réel
          </label> */}
          <div className={styles['preview-panel']}>
            <Preview recipes={recipes} />
          </div>
          <Link href='/livre'>Aperçu plein écran</Link>
        </section>
        <section className={styles.checkout}>
          {/* <button>Checkout</button> */}
        </section>
      </main>
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
