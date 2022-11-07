import { useEffect, useRef, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import TOC from './TOC'

import styles from '../styles/Search.module.css'

export default function Search ({ query, filteredRecipes, onSearch }) {
  const queryInput = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const { t } = useTranslation('search')
  function declareFocused () {
    setIsFocused(true)
  }
  function declareUnfocused () {
    setIsFocused(false)
  }
  function onSubmit (event) {
    event.preventDefault()
    onSearch(queryInput.current.value)
  }
  function onKeyDown (event) {
    if (event.key === 'Escape') {
      queryInput.current.blur()
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown, false)
    return () => {
      window.removeEventListener('keydown', onKeyDown, false)
    }
  }, [])
  return (
    <div className={styles.search}>
      <form onSubmit={onSubmit}>
        <input ref={queryInput} type='text' defaultValue={query || ''} placeholder={t('placeholder')} onFocus={declareFocused} />
      </form>
      <div className={`${styles.panel} ${isFocused ? styles.focused : styles.unfocused}`}>
        <TOC recipes={filteredRecipes} />
      </div>
    </div>
  )
}