import Head from 'next/head'

export default function Page ({ meta, children }) {
  const { title, desc } = meta
  return (
    <div className='container'>
      <Head>
        <title>{title}</title>
        <meta name='description' content={desc} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>{children}</main>
    </div>
  )
}
