import { useParams } from "react-router-dom"
import { recipes } from "../data/recipes"

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>()

  const recipe = recipes.find(
    r => r.id.toString() === id
  )

  if (!recipe) {
    return (
      <p className="text-center mt-24 opacity-60">
        Receta no encontrada
      </p>
    )
  }

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl mb-6">{recipe.title}</h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-xl mb-8"
      />

      <h2 className="text-2xl mb-4">Ingredientes</h2>
      <ul className="list-disc pl-6 mb-8">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-2xl mb-4">Pasos</h2>
      <ol className="list-decimal pl-6">
        {recipe.steps.map((step, i) => (
          <li key={i} className="mb-2">
            {step}
          </li>
        ))}
      </ol>
    </section>
  )
}

