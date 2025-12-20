import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Recipe } from './types';
import RecipeCard from './components/recipecard';
import CardSkeleton from './components/cardskeleton';
import Footer from './components/footer';
import PageTransition from './components/pagetransition';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Use Supabase full-text search. 
        // We will search in 'title' and 'description'.
        // The <-> operator is for distance, but here we use textSearch for keywords.
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .textSearch('fts', query, {
            type: 'websearch',
            config: 'spanish'
          });

        if (error) {
          throw new Error('Error al realizar la búsqueda.');
        }

        setResults(data || []);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <PageTransition>
      <div className="bg-stone-50 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">

          {/* Header */}
          <div className="mb-12">
            {query ? (
              <h1 className="font-serif text-4xl md:text-5xl text-stone-800">
                Resultados para: <span className='text-orange-600'>"{query}"</span>
              </h1>
            ) : (
              <h1 className="font-serif text-4xl md:text-5xl text-stone-800">
                Realiza una búsqueda
              </h1>
            )}
          </div>

          {/* Results Grid */}
          {
            loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <p className="text-center text-stone-600 text-lg">
                No se encontraron recetas. Intenta con otra búsqueda.
              </p>
            )
          }
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default SearchPage;
