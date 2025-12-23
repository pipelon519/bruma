import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { Recipe } from "../types";
import { Clock, ChefHat, Heart, MessageSquare } from 'lucide-react';
import LikeButton from "./components/LikeButton";
import CommentsSection from "./components/comments";

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("No recipe ID provided.");
      return;
    }

    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching recipe:', error);
        setError("Could not fetch the recipe.");
        setRecipe(null);
      } else {
        setRecipe(data);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="py-32 text-center">Loading recipe...</div>;
  }

  if (error) {
    return <div className="py-32 text-center text-red-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="py-32 text-center">Recipe not found.</div>;
  }

  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-white leading-tight mb-4">
          {recipe.title}
        </h1>
        {recipe.category && (
          <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">
            {recipe.category}
          </p>
        )}
      </div>

      <div className="w-full h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={recipe.image || '/assets/recetas/placeholder.jpg'}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- Meta Info & Actions --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
        <div className="flex items-center gap-4 text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-1.5">
            <Clock size={18} />
            <span>{totalTime > 0 ? `${totalTime} min` : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChefHat size={18} />
            <span className="capitalize">{recipe.difficulty || 'N/A'}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LikeButton recipeId={recipe.id} />
          <a href="#comments" className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Comments</span>
          </a>
        </div>
      </div>

      <div className="prose dark:prose-invert lg:prose-lg max-w-none mb-12">
        <p className="lead">{recipe.description}</p>

        <div className="grid md:grid-cols-2 gap-x-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2">
              {(recipe.ingredients as string[] || []).map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-4">
              {(recipe.instructions as string[] || []).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <hr className="my-12 border-stone-200 dark:border-stone-700"/>

      {/* --- Comments Section --- */}
      <div id="comments">
        <CommentsSection recipeId={recipe.id} />
      </div>
    </article>
  );
}
