
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Recipe } from './types';
import PageTransition from './components/pagetransition';
import RecipeCard from './components/recipecard';
import CardSkeleton from './components/cardskeleton';

// Helper to convert slug back to Title Case
const slugToTitleCase = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      setLoading(true);
      if (!slug) {
        setError('Categoría no encontrada.');
        setLoading(false);
        return;
      }

      const categoryName = slugToTitleCase(slug);

      try {
        const { data, error: fetchError } = await supabase
          .from('recipes')
          .select('*')
          .eq('category', categoryName) // Use the title-cased name for the query
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw new Error('No se pudieron cargar las recetas para esta categoría.');
        }

        setRecipes(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByCategory();
  }, [slug]);

  const formattedCategoryName = slug ? slugToTitleCase(slug) : '';

  return (
    <PageTransition>
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl mb-12 capitalize font-serif text-stone-800">
          {formattedCategoryName}
        </h1>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-stone-500">No se encontraron recetas en esta categoría... todavía.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
