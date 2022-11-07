import About from '../texts/fr/about.mdx'
import ContributionsWelcome from '../texts/fr/contributions-welcome.mdx'

import styles from '../styles/BackCover.module.css'

export default function BackCover () {
  return (
    <div className={styles['back-cover']}>
      <div>
        <About />
      </div>
      <div>
        <ContributionsWelcome />
      </div>
    </div>
  )
}
