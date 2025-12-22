
import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import PageTransition from "./components/pagetransition";

// Corrected form data to match the database schema
type FormData = {
  title: string;
  description: string;
  ingredients: string; // Will be a textarea, split into an array on submit
  steps: string;       // Renamed from instructions, will also be split
  image: string;       // Renamed from image_url
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: 'Fácil' | 'Intermedia' | 'Difícil';
  category: string;
};

export default function AddRecipePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    if (!user) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión de nuevo para crear una receta.");
      navigate('/login');
      return;
    }

    // Transform string data into arrays for the database
    const ingredientsArray = data.ingredients.split('\n').filter(line => line.trim() !== '');
    const stepsArray = data.steps.split('\n').filter(line => line.trim() !== '');

    const { error } = await supabase.from("recipes").insert([{
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
      user_id: user.id,
    }]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert(`Error al crear la receta: ${error.message}.\n\nProblemas comunes: Asegúrate de que todos los campos obligatorios están rellenos. El error también puede deberse a un problema de permisos en la base de datos.`);
    } else {
      navigate("/my-recipes");
    }
  };

  return (
    <PageTransition>
      <div className="bg-stone-50 min-h-screen py-12 md:py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-800">Crear Nueva Receta</h1>
            <p className="mt-3 text-lg text-stone-600">Comparte tus creaciones culinarias con el mundo.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
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
                <PlusCircle className="-ml-1 mr-3 h-5 w-5" />
                {isSubmitting ? "Añadiendo..." : "Añadir Receta"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
