import RecipePage from './RecipePage'
import FrontCover from './FrontCover'
import If from '../utils/If'

export default function Preview ({ recipes }) {
  return (
    <div>
      <section>
        <FrontCover />
      </section>
      <If present={recipes} map={(recipe) => {
        return (
          <section key={recipe._id}>
            <RecipePage recipe={recipe} />
          </section>
        )
      }} />
    </div>
  )
}
