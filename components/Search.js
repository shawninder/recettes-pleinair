import { useEffect, useRef, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import TOC from './TOC'

import styles from '../styles/Search.module.css'

export default function Search ({ query, filteredRecipes, onSearch }) {
  const ref = useRef(null)
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
      declareUnfocused()
    }
  }
  function onClick (event) {
    if (!ref.current.contains(event.target)) {
      declareUnfocused()
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown, false)
    window.addEventListener('click', onClick, false)
    return () => {
      window.removeEventListener('keydown', onKeyDown, false)
      window.removeEventListener('click', onClick, false)
    }
  }, [])
  return (
    <div className={styles.search} ref={ref} style={{ opacity: isFocused ? 1 : 0.5 }}>
      <form onSubmit={onSubmit}>
        <input ref={queryInput} type='text' defaultValue={query || ''} placeholder={t('placeholder')} onFocus={declareFocused} />
      </form>
      <div className={`${styles.panel} ${isFocused ? styles.focused : styles.unfocused}`}>
        <TOC recipes={filteredRecipes} />
      </div>
    </div>
  )
}