import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Footer from "./components/footer";
import PageTransition from "./components/pagetransition";
import Comments from "./components/comments";
import RecipeSkeleton from "./components/recipeskeleton"; // 1. Import the skeleton component

// Define a type for the recipe object
type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: string;
  ingredients: string[]; // Stored as JSONB, parsed as string array
  steps: string[]; // Stored as JSONB, parsed as string array
  notes: string;
};

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // Simulate a slightly longer loading time to see the skeleton
        await new Promise(resolve => setTimeout(resolve, 500));

        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw new Error(`No se pudo encontrar la receta: ${error.message}`);
        }

        if (data) {
          setRecipe(data);
        } else {
          throw new Error("Receta no encontrada.");
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // 2. Use the RecipeSkeleton component when loading
  if (loading) {
    return (
      <PageTransition>
        <RecipeSkeleton />
        <Footer />
      </PageTransition>
    );
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-20 text-red-600">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>{error || "No se pudo cargar la receta."}</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="bg-white pt-12 sm:pt-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-base font-semibold leading-7 text-[var(--text)]-600">{recipe.difficulty} &middot; {recipe.time}</p>
            <h1 className="mt-2 text-4xl tracking-tight text-gray-900 sm:text-5xl font-serif">
              {recipe.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              {recipe.description}
            </p>
          </div>

          {/* Image */}
          <div className="aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-lg mb-12">
            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          </div>

          {/* Main Content: Ingredients & Steps */}
          <div className="flex flex-col md:flex-row gap-12">

            {/* Ingredients */}
            <div className="md:w-1/3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredientes</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Preparación</h2>
              <ol className="list-decimal list-inside space-y-6 text-gray-700 marker:font-bold">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="pl-2">{step}</li>
                ))}
              </ol>
            </div>

          </div>

          {/* Notes */}
          {recipe.notes && (
            <div className="mt-12 pt-8 border-t border-gray-200">
               <h3 className="text-xl font-semibold text-gray-900">Notas del Chef</h3>
               <p className="mt-4 text-gray-600 italic">{recipe.notes}</p>
            </div>
          )}

        </div>
      </div>

      {id && <Comments recipeId={id} />}

      <Footer />
    </PageTransition>
  );
}
