import useTranslation from 'next-translate/useTranslation'
import Page from '../components/Page'
import fr from '../texts/fr/about.mdx'

const txt = {
  fr
}

export default function About () {
  const { t, lang } = useTranslation('about')
  const { t: appT } = useTranslation('app')
  const appName = appT('name')
  const meta = {
    title: t('title', { name: appName }),
    desc: t('desc')
  }
  const Txt = txt[lang]
  return (
    <Page meta={meta}>
      <Txt name={appName} />
    </Page>
  )
}
