import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api/recipes";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getRecipeById(id)
      .then(setRecipe)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="py-32 text-center">cargando receta…</p>;
  }

  if (!recipe) {
    return <p className="py-32 text-center">no hay receta</p>;
  }

  return (
    <article className="max-w-5xl mx-auto px-6 py-24">

      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-4xl w-full h-[420px] object-cover mb-16"
      />

      <h1 className="font-serif text-5xl mb-6">
        {recipe.title}
      </h1>

      <p
        className="opacity-70 mb-12"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />

      <section className="grid md:grid-cols-2 gap-16">

        <div>
          <h2 className="text-2xl font-semibold mb-4">ingredientes</h2>
          <ul className="space-y-2 opacity-70">
            {recipe.extendedIngredients.map((ing: any) => (
              <li key={ing.id}>• {ing.original}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">preparación</h2>
          <ol className="space-y-4 opacity-80">
            {recipe.analyzedInstructions[0]?.steps.map((step: any) => (
              <li key={step.number}>
                <strong>{step.number}.</strong> {step.step}
              </li>
            ))}
          </ol>
        </div>

      </section>

    </article>
  );
}
