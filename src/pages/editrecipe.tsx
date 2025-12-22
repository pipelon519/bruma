
import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import PageTransition from "./components/pagetransition";

// Form data matching the database schema
type FormData = {
  title: string;
  description: string;
  ingredients: string; // Will be a textarea, transformed from array on load, to array on submit
  steps: string;      
  image: string;       
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: 'Fácil' | 'Intermedia' | 'Difícil';
  category: string;
};

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError("No se proporcionó ID de receta.");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !data) {
        setError("No se pudo cargar la receta para editar. Es posible que no exista o no tengas permiso.");
        setLoading(false);
        return;
      }

      // Transform array data back into newline-separated strings for the textarea
      const formData: FormData = {
        ...data,
        ingredients: Array.isArray(data.ingredients) ? data.ingredients.join('\n') : '',
        steps: Array.isArray(data.steps) ? data.steps.join('\n') : '',
      };

      reset(formData); // Populate the form with the fetched data
      setLoading(false);
    };

    fetchRecipe();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    if (!user || !id) {
      alert("Tu sesión ha expirado o el ID de la receta es inválido.");
      return;
    }

    // Transform string data from textareas back into arrays
    const ingredientsArray = data.ingredients.split('\n').filter(line => line.trim() !== '');
    const stepsArray = data.steps.split('\n').filter(line => line.trim() !== '');

    const { error: updateError } = await supabase
      .from('recipes')
      .update({
        title: data.title,
        description: data.description,
        image: data.image,
        prep_time: data.prep_time,
        cook_time: data.cook_time,
        servings: data.servings,
        difficulty: data.difficulty,
        category: data.category,
        ingredients: ingredientsArray,
        steps: stepsArray,
      })
      .match({ id: id, user_id: user.id }); // IMPORTANT: user_id match prevents editing others' recipes

    if (updateError) {
      console.error("Supabase update error:", updateError);
      alert(`Error al actualizar la receta: ${updateError.message}`);
    } else {
      navigate(`/recipe/${id}`); // Go back to the recipe detail page after editing
    }
  };

  if (loading) return <div className="text-center py-20">Cargando editor...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <PageTransition>
      <div className="bg-stone-50 min-h-screen py-12 md:py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-800">Editar Receta</h1>
            <p className="mt-3 text-lg text-stone-600">Realiza cambios y guarda tu receta perfeccionada.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            {/* Form fields are identical to AddRecipePage, so they will be pre-filled by react-hook-form's `reset` */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
              <input {...register("title", { required: "El título es obligatorio" })} id="title" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                  <input {...register("category", { required: "La categoría es obligatoria" })} id="category" placeholder="Ej. Postres, Sopas..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
              </div>
              <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Dificultad</label>
                  <select {...register("difficulty", { required: "La dificultad es obligatoria" })} id="difficulty" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                      <option value="Fácil">Fácil</option>
                      <option value="Intermedia">Intermedia</option>
                      <option value="Difícil">Difícil</option>
                  </select>
                  {errors.difficulty && <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea {...register("description", { required: "La descripción es obligatoria" })} id="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="prep_time" className="block text-sm font-medium text-gray-700">Tiempo de Prep. (min)</label>
                    <input {...register("prep_time", { required: true, valueAsNumber: true })} type="number" id="prep_time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                    {errors.prep_time && <p className="mt-1 text-sm text-red-600">Requerido</p>}
                </div>
                <div>
                    <label htmlFor="cook_time" className="block text-sm font-medium text-gray-700">Tiempo de Cocción (min)</label>
                    <input {...register("cook_time", { required: true, valueAsNumber: true })} type="number" id="cook_time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                    {errors.cook_time && <p className="mt-1 text-sm text-red-600">Requerido</p>}
                </div>
                <div>
                    <label htmlFor="servings" className="block text-sm font-medium text-gray-700">Porciones</label>
                    <input {...register("servings", { required: true, valueAsNumber: true })} type="number" id="servings" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                    {errors.servings && <p className="mt-1 text-sm text-red-600">Requerido</p>}
                </div>
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredientes (uno por línea)</label>
              <textarea {...register("ingredients", { required: "Los ingredientes son obligatorios" })} id="ingredients" rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
              {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients.message}</p>}
            </div>

            <div>
              <label htmlFor="steps" className="block text-sm font-medium text-gray-700">Instrucciones (un paso por línea)</label>
              <textarea {...register("steps", { required: "Las instrucciones son obligatorias" })} id="steps" rows={8} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
              {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps.message}</p>}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
              <input {...register("image")} id="image" type="url" placeholder="https://ejemplo.com/imagen.jpg" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
            </div>

            <div className="text-right">
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50">
                <Save className="-ml-1 mr-3 h-5 w-5" />
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
