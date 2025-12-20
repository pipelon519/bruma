import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Footer from "./components/footer";
import PageTransition from "./components/pagetransition";

// Define a type for the recipe object for type safety
type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: string;
};

// --- Reusable Recipe Card Component ---
function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="group block">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-2xl bg-gray-100">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
        />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-800">{recipe.title}</h3>
      <p className="mt-1 text-md text-gray-600">{recipe.description}</p>
    </Link>
  );
}

// --- Main Category Details Page Component ---
export default function CategoryDetailsPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      if (!categoryName) return;

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('category', categoryName);

        if (error) {
          throw new Error(`No se pudieron cargar las recetas: ${error.message}`);
        }

        setRecipes(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByCategory();
  }, [categoryName]);

  // Capitalize the first letter of the category name for the title
  const formattedCategoryName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "Categoría";

  return (
    <PageTransition>
      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="border-b border-gray-200 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Recetas de {formattedCategoryName}</h1>
            <p className="mt-4 text-base text-gray-500">
              Explora nuestra selección de recetas de {categoryName}.
            </p>
          </div>

          <div className="pt-12">
            {loading ? (
              <p className="text-center text-gray-500">Cargando recetas...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No se encontraron recetas en esta categoría.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </PageTransition>
  );
}
