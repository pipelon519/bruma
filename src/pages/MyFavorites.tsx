
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import PageTransition from './components/pagetransition';
import RecipeCard from './components/recipecard';
import type { Recipe } from './types';

const MyFavorites = () => {
  const { user } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Fetch the IDs of the favorited recipes
        const { data: favoriteData, error: favoriteError } = await supabase
          .from('favorite_recipes')
          .select('recipe_id')
          .eq('user_id', user.id);

        if (favoriteError) throw new Error('Error al cargar los IDs de favoritos: ' + favoriteError.message);

        const recipeIds = favoriteData.map(fav => fav.recipe_id);

        if (recipeIds.length === 0) {
          setFavoriteRecipes([]);
          setLoading(false);
          return;
        }

        // 2. Fetch the actual recipes using the IDs
        const { data: recipesData, error: recipesError } = await supabase
          .from('recipes')
          .select('*')
          .in('id', recipeIds);

        if (recipesError) throw new Error('Error al cargar las recetas: ' + recipesError.message);
        
        setFavoriteRecipes(recipesData as Recipe[]);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, [user]);

  return (
    <PageTransition>
      <div className="bg-stone-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-stone-800">Mis Recetas Favoritas</h1>
            <p className="mt-3 text-lg text-stone-600">Tu colección personal de las recetas que más te gustan.</p>
          </div>

          {loading && (
            <div className="text-center">
              <p>Cargando tus favoritos...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500">
              <p>Ha ocurrido un error: {error}</p>
            </div>
          )}

          {!loading && !error && favoriteRecipes.length === 0 && (
            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-stone-700">Tu libro de recetas está vacío</h3>
              <p className="mt-2 text-stone-500">Aún no has guardado ninguna receta. ¡Explora y añade las que te gusten con el icono del corazón ❤!</p>
            </div>
          )}

          {!loading && !error && favoriteRecipes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {favoriteRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default MyFavorites;
