import Link from 'next/Link'

export default function RecipeListItem ({ recipe }) {
  const { _id, name } = recipe
  return <Link href={`/recettes/${_id}`}>{name}</Link>
}
