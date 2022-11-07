import useTranslation from 'next-translate/useTranslation'

import styles from '../styles/FrontCover.module.css'

export default function Cover () {
  const { t: appT } = useTranslation('app')
  const { t } = useTranslation('book')
  return (
    <div className={styles.cover}>
      <h1 className={styles.title}>{t('title', { appName: appT('name') })}</h1>
      <p className={styles.tagline}>{t('desc')}</p>
    </div>
  )
}