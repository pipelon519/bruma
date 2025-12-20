import type { Recipe } from "../../data/recipes";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    (<Link to={`/recipe/${recipe.id}`}>
    
    <article
      className="group rounded-3xl overflow-hidden bg-[var(--tarjeta-1)] hover:scale-[1.02] transition">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="h-56 w-full object-cover" />

      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">
          {recipe.title}
        </h3>

        <p className="opacity-70 mb-4">
          {recipe.description}
        </p>

        <div className="flex justify-between text-sm opacity-60">
          <span>{recipe.time}</span>
          <span>{recipe.level}</span>
        </div>
      </div>
    </article>
    </Link>)
  );
}
