import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Recipe } from './types';
import RecipeCard from './components/recipecard';
import CardSkeleton from './components/cardskeleton';
import Footer from './components/footer';
import PageTransition from './components/pagetransition';

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAndFetchRecipes = async () => {
      // 1. Check for an active session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        // If no session, redirect to login page
        navigate('/login');
        return;
      }
      
      const currentUser = session.user;
      setUser(currentUser);

      // 2. Fetch recipes created by the current user
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('user_id', currentUser.id) // Filter by the logged-in user's ID
          .order('created_at', { ascending: false });

        if (error) {
          throw new Error('No se pudieron cargar tus recetas.');
        }

        setRecipes(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkUserAndFetchRecipes();
  }, [navigate]);

  return (
    <PageTransition>
      <div className="bg-stone-50 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-800">
              Mis Recetas
            </h1>
            <p className="mt-3 text-lg text-stone-600">
              Aquí encontrarás todas las recetas que has creado.
            </p>
          </div>

          {/* Recipe Grid */}
          {
            loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <p className="text-center text-stone-600 text-lg">
                Aún no has creado ninguna receta.
              </p>
            )
          }
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default MyRecipesPage;
