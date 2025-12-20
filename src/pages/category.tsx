import { useParams } from "react-router-dom"
import { recipes } from "../data/recipes"
import PageTransition from "./components/pagetransition"
import RecipeCard from "./components/recipecard" // This was the missing import

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug) {
    return <p>Categoría no encontrada</p>
  }

  const filtered = recipes.filter(r => r.category === slug)

  return (
    <PageTransition>
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl mb-12 capitalize font-serif">
          {slug.replace("-", " ")}
        </h1>

        {filtered.length === 0 ? (
          <p className="opacity-60">No hay recetas en esta categoría... todavía.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(r => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  )
}
