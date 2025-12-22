
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PageTransition from './components/pagetransition';
import { ChefHat, Clock, Users, BarChart, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Recipe } from './types';

// A much simpler component to render lists of content (ingredients or steps)
const ContentSection = ({ title, items, listType = 'ol' }: { title: string, items: string[], listType?: 'ul' | 'ol' }) => {
  if (!items || items.length === 0) return null;

  const ListComponent = listType;
  const listItemClasses = listType === 'ul' 
    ? "text-stone-700 leading-relaxed list-disc list-inside"
    : "text-stone-700 leading-relaxed list-decimal list-inside";

  return (
    <div>
      <h2 className="font-serif text-2xl text-stone-800 border-b-2 border-orange-200 pb-2 mb-4">{title}</h2>
      <ListComponent className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className={listItemClasses}>
            {item}
          </li>
        ))}
      </ListComponent>
    </div>
  );
};

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      if (!id) {
        setError("No se ha proporcionado un ID de receta.");
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase.from('recipes').select('*').eq('id', id).single();
        if (fetchError) throw new Error("No se pudo encontrar la receta solicitada.");
        setRecipe(data as any);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (!recipe || !user || user.id !== recipe.user_id) return;
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.");
    if (isConfirmed) {
      const { error: deleteError } = await supabase.from('recipes').delete().match({ id: recipe.id });
      if (deleteError) {
        alert("Error eliminando la receta: " + deleteError.message);
      } else {
        navigate('/my-recipes');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><p>Cargando receta...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500 font-semibold">{error}</p></div>;
  if (!recipe) return <div className="flex justify-center items-center h-screen"><p>Receta no encontrada.</p></div>;

  const isOwner = user && user.id === recipe.user_id;
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: any }) => (
    <div className="flex flex-col items-center justify-center bg-orange-50 p-4 rounded-lg text-center shadow-sm">
        <Icon className="h-8 w-8 text-orange-500 mb-2" />
        <span className="text-sm text-stone-600 font-medium">{label}</span>
        <span className="text-lg font-bold text-stone-800 capitalize">{value || 'N/A'}</span>
    </div>
  );

  return (
    <PageTransition>
      <div className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-4 mb-4">
              {recipe.category && <p className="text-orange-600 font-semibold">{recipe.category.toUpperCase()}</p>}
              {isOwner && (
                <div className="flex items-center gap-2 border-l pl-4 ml-2">
                  <Link to={`/edit-recipe/${recipe.id}`} title="Editar Receta" className="p-2 rounded-full hover:bg-stone-100 transition-colors"><Edit className="h-5 w-5 text-stone-600" /></Link>
                  <button onClick={handleDelete} title="Eliminar Receta" className="p-2 rounded-full hover:bg-stone-100 transition-colors"><Trash2 className="h-5 w-5 text-red-500" /></button>
                </div>
              )}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-stone-900">{recipe.title}</h1>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">{recipe.description}</p>
          </div>

          {recipe.image && <div className="mb-12 rounded-xl overflow-hidden shadow-2xl aspect-video"><img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" /></div>}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <DetailItem icon={Clock} label="Tiempo" value={totalTime > 0 ? `${totalTime} min` : 'N/A'} />
            <DetailItem icon={ChefHat} label="Dificultad" value={recipe.difficulty} />
            <DetailItem icon={Users} label="Porciones" value={recipe.servings} />
            <DetailItem icon={BarChart} label="Categoría" value={recipe.category} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <ContentSection title="Ingredientes" items={recipe.ingredients} listType="ul" />
            </div>
            <div className="md:col-span-2">
              <ContentSection title="Instrucciones" items={recipe.steps} listType="ol" />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
