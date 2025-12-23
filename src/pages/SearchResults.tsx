
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import RecipeCard from './components/recipecard';
import type { Recipe } from './types';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // Corrected to 'query' to match SearchBar
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!query) {
        setRecipes([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error: rpcError } = await supabase
          .rpc('search_recipes', { search_term: query });

        if (rpcError) {
          throw rpcError;
        }

        setRecipes(data || []);
      } catch (err: any) {
        console.error("Error fetching search results:", err);
        setError(err.message); // Show the actual error message
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {loading ? (
        <h1 className="text-2xl md:text-3xl font-serif text-stone-800 mb-8">Buscando...</h1>
      ) : (
        <>
          <h1 className="text-2xl md:text-3xl font-serif text-stone-800 mb-8">
            {recipes.length > 0 ? `Resultados para "${query}"` : `No hay resultados para "${query}"`}
          </h1>
          {error && <p className="text-red-500 bg-red-100 p-4 rounded-md"><strong>Error:</strong> {error}</p>}
          
          {recipes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            }
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
