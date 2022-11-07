import useTranslation from 'next-translate/useTranslation'

import styles from '../styles/Spine.module.css'

export default function Spine () {
  const { t } = useTranslation('book')
  return (
    <div className={styles.spine}>
      <p>{t('by', { author: 'Shawn Inder' })}</p>
    </div>
  )
}
