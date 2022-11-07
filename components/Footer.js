import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

import footerStyles from '../styles/Footer.module.css'

export default function Footer() {
  const { t } = useTranslation('footer')

  const major = [{
    label: t('major-section-0'),
    links: [{
      href: t('about-url'),
      label: t('about-label')
    }, {
      href: t('faq-url'),
      label: t('faq-label')
    }]
  }, {
    label: t('major-section-1'),
    links: [{
      href: t('issue-url'),
      label: t('issue-label')
    }, {
      href: t('suggestion-url'),
      label: t('suggestion-label')
    }, {
      href: t('question-url'),
      label: t('question-label')
    }]
  }]
  const minor = [{
    label: t('minor-section-0'),
    links: []
  }]

  return (
    <footer className={footerStyles.footer}>
      <hr />
      <nav>
        {major.map((list) => {
          return (
            <ul key={list.label}>
              {list.links.map(({ href, title, label }) => {
                return (
                  <li key={label}>
                    <Link key={label} href={href} title={title}>
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )
        })}
        {minor.map((list) => {
          return (
            <ul key={list.label}>
              {list.links.map(({ href, title, label }) => {
                return (
                  <li key={label}>
                    <Link key={label} href={href} title={title}>
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </nav>
    </footer>
  )
}
