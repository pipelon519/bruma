import { useParams } from "react-router-dom"
import { recipes } from "../data/recipes"
import RecipeCard from "./components/recipecard"

export default function Category() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) return <p>Categoría inválida</p>

  const filtered = recipes.filter(
    r => r.category.toLowerCase() === slug.toLowerCase()
  )

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl mb-12 capitalize">{slug}</h1>

      {filtered.length === 0 ? (
        <p>No hay recetas en esta categoría</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map(r => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </section>
  )
}

