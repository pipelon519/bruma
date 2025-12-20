import { Link } from "react-router-dom"
import type { Recipe } from "../types"

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <article className="group rounded-3xl overflow-hidden bg-[var(--tarjeta-1)] hover:scale-[1.02] transition-transform duration-300">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-56 w-full object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-serif font-semibold mb-2 line-clamp-2">
            {recipe.title}
          </h3>

          <p className="opacity-70 mb-4 line-clamp-3">
            {recipe.description}
          </p>

          <div className="flex justify-between items-center text-sm opacity-80 mt-4">
            <span>{recipe.time}</span>
            <span className="font-medium capitalize">{recipe.difficulty}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
