import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import topNavStyles from '../styles/TopNav.module.css'

export default function TopNav () {
  const { t } = useTranslation('nav')
  const [panelOpen, setPanelOpen] = useState(false)

  const home = {
    href: t('home-url'),
    label: t('home-label')
  }
  const cta = {
    href: t('book-url'),
    label: t('book-label')
  }

  const major = [
    {
      href: t('recipes-url'),
      label: t('recipes-label')
    },
    {
      href: t('blog-url'),
      label: t('blog-label')
    },
    {
      href: t('contribute-url'),
      label: t('contribute-label')
    }
  ]

  const minor = [
    {
      href: t('pricing-url'),
      label: t('pricing-label')
    }
  ]

  function togglePanel () {
    setPanelOpen(!panelOpen)
  }
  return (
    <header className={topNavStyles.header}>
      <nav>
        <div className={topNavStyles.toggle} onClick={togglePanel}>
          <Image
            src='/placeholder.png'
            width='48'
            height='48'
            alt={panelOpen ? 'close' : 'menu'}
          />
        </div>
        <div className={topNavStyles.home}>
          <Link href={home.href} title={home.title}>
            <Image
              src='/favicon.ico'
              width='48'
              height='48'
              alt={home.label}
            />
          </Link>
        </div>
        <div
          className={`${topNavStyles.panel} ${
            panelOpen
              ? topNavStyles['panel-open']
              : topNavStyles['panel-closed']
          }`}
        >
          <ul className={topNavStyles.major}>
            {major.map(({ href, title, label }) => {
              return (
                <li key={label}>
                  <Link href={href} title={title}>
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ul className={topNavStyles.minor}>
            {minor.map(({ href, title, label }) => {
              return (
                <li key={label}>
                  <Link href={href} title={title}>
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={topNavStyles.cta}>
          <Link href={cta.href} title={cta.title}>
            <button>{cta.label}</button>
          </Link>
        </div>
      </nav>
    </header>
  )
}