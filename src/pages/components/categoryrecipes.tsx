
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { Recipe } from "../types";
import RecipeCard from "./recipecard";

export default function CategoryRecipes() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      if (!categoryName) {
        setError("Nombre de categoría no encontrado.");
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('recipes')
        .select('*')
        .eq('category', categoryName)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching recipes by category:', fetchError);
        setError("No se pudieron cargar las recetas.");
      } else {
        setRecipes(data as any);
      }
      setLoading(false);
    };

    fetchRecipesByCategory();
  }, [categoryName]);

  if (loading) {
    return <p className="text-center mt-24 opacity-60">Cargando recetas...</p>;
  }

  if (error) {
    return <p className="text-center mt-24 text-red-500">{error}</p>;
  }

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h1 className="font-serif text-5xl mb-12 capitalize">
        {categoryName}
      </h1>

      {recipes.length === 0 ? (
        <p className="opacity-60">
          No hay recetas todavía en esta categoría.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  );
}
