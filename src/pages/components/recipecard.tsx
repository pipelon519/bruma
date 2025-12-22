
import { Link } from "react-router-dom";
import type { Recipe } from "../types";
import { Clock, ChefHat } from 'lucide-react';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  // Combine prep and cook time for a total, or show N/A
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <Link to={`/recipe/${recipe.id}`} className="w-full h-full block">
      <article className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="w-full h-48 overflow-hidden">
          <img
            src={recipe.image || '/assets/recetas/placeholder.jpg'} // CORRECTED: Use recipe.image and the standard placeholder
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {recipe.category && (
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
              {recipe.category}
            </p>
          )}
          <h3 className="text-lg font-bold text-stone-800 mb-2 line-clamp-2 leading-tight">
            {recipe.title}
          </h3>

          <p className="text-sm text-stone-600 line-clamp-3 flex-grow">
            {recipe.description}
          </p>

          <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{totalTime > 0 ? `${totalTime} min` : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ChefHat size={14} />
              <span className="font-medium capitalize">{recipe.difficulty || 'N/A'}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
