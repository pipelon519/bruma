import { Link } from "react-router-dom";
import type { Recipe } from "../types";
import { Clock, ChefHat, MessageSquare } from 'lucide-react';
import FavoriteButton from "./FavoriteButton";
import LikeButton from "./LikeButton"; // 1. Import LikeButton
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { user } = useAuth();
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      const { count, error } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('recipe_id', recipe.id);
      
      if (error) {
        console.error('Error fetching comment count:', error);
      } else {
        setCommentCount(count || 0);
      }
    };

    fetchCommentCount();
  }, [recipe.id]);

  return (
    <div className="w-full h-full relative group">
      <div className="w-full h-full block">
        <article className="rounded-2xl overflow-hidden bg-white dark:bg-stone-800 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          <Link to={`/recipe/${recipe.id}`} className="block">
            <div className="w-full h-48 overflow-hidden">
              <img
                src={recipe.image || '/assets/recetas/placeholder.jpg'}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          <div className="p-5 flex flex-col flex-grow">
            {recipe.category && (
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
                {recipe.category}
              </p>
            )}
            <Link to={`/recipe/${recipe.id}`} className="block flex-grow">
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2 line-clamp-2 leading-tight">
                {recipe.title}
              </h3>

              <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-3 flex-grow">
                {recipe.description}
              </p>
            </Link>

            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-700 flex justify-between items-center text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{totalTime > 0 ? `${totalTime} min` : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ChefHat size={14} />
                <span className="font-medium capitalize">{recipe.difficulty || 'N/A'}</span>
              </div>
            </div>

            {/* --- Social Bar --- */}
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700 flex justify-between items-center">
                <LikeButton recipeId={recipe.id} />
                <Link to={`/recipe/${recipe.id}#comments`} className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span>{commentCount}</span>
                </Link>
            </div>

          </div>
        </article>
      </div>
      
      {user && (
        <div 
          className="absolute top-3 right-3 z-10 bg-white/50 backdrop-blur-sm rounded-full"
          onClick={(e) => { 
            e.preventDefault();
            e.stopPropagation(); 
          }}
        >
          <FavoriteButton recipeId={recipe.id} />
        </div>
      )}
    </div>
  );
}
