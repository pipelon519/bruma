import { useParams } from "react-router-dom"
import { recipes } from "../../data/recipes"
import RecipeCard from "./recipecard"

export default function CategoryRecipes() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) {
    return (
      <p className="text-center mt-24 opacity-60">
        Categoría inválida
      </p>
    )
  }

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category === slug
  )

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h1 className="font-serif text-5xl mb-12 capitalize">
        {slug}
      </h1>

      {filteredRecipes.length === 0 ? (
        <p className="opacity-60">
          No hay recetas todavía en esta categoría.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  )
}
