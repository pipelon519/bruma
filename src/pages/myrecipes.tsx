import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { Recipe } from './types';
import PageTransition from './components/pagetransition';
import { PlusCircle } from 'lucide-react';

// A simple card component for displaying a recipe preview
const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Link to={`/recipe/${recipe.id}`} className="block group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
    <div className="aspect-w-3 aspect-h-2">
      <img src={recipe.image || '/assets/recetas/placeholder.jpg'} alt={recipe.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-6">
      <h3 className="font-serif text-2xl text-stone-800 mb-2">{recipe.title}</h3>
      <p className="text-stone-600 line-clamp-2">{recipe.description}</p>
    </div>
  </Link>
);

export default function MyRecipes() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user recipes:', error);
      } else {
        setRecipes(data as any);
      }
      setLoading(false);
    };

    fetchUserRecipes();
  }, [user]);

  if (loading) {
    return <div className="text-center py-20">Cargando tus recetas...</div>;
  }

  if (!user) {
    return (
      <PageTransition>
        <div className="text-center py-20">
          <h1 className="font-serif text-4xl mb-4">Inicia sesión para ver tus recetas</h1>
          <Link to="/login" className="text-orange-600 hover:underline">Ir a la página de inicio de sesión</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-10">
            <h1 className="font-serif text-5xl text-stone-900">Mis Recetas</h1>
            {/* CORRECTED LINK from /new-recipe to /add-recipe */}
            <Link to="/add-recipe" className="inline-flex items-center gap-2 bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors shadow-md">
              <PlusCircle size={20} />
              <span>Crear Nueva Receta</span>
            </Link>
          </div>

          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-12 rounded-lg shadow-md">
              <h2 className="font-serif text-2xl mb-2">Aún no has creado ninguna receta.</h2>
              <p className="text-stone-600 mb-6">¡Es hora de empezar a cocinar! Haz clic en el botón para añadir tu primera creación.</p>
              {/* CORRECTED LINK from /new-recipe to /add-recipe */}
              <Link to="/add-recipe" className="text-orange-600 font-semibold hover:underline">
                Crear mi primera receta
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
