export default function RecipeListItem ({ recipe }) {
  const { _id, name } = recipe
  return <a href={`/recipe/${_id}`}>{name}</a>
}
