import styles from '../styles/Cover.module.css'

export default function Cover ({ children }) {
  return (
    <div className={styles.cover}>{children}</div>
  )
}
