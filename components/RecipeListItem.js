import Link from 'next/Link'

import styles from '../styles/RecipeListItem.module.css'

export default function RecipeListItem ({ recipe }) {
  const { _id, name, img } = recipe
  return (
    <Link
      className={styles.item}
      href={`/recettes/${_id}`}
      style={{ backgroundImage: `url("${img}")` }}
    >{name}</Link>
  )
}
