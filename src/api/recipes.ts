const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
const BASE_URL = "https://api.spoonacular.com";

export async function getRecipeById(id: string) {
  const res = await fetch(
    `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("no se pudo cargar la receta");
  }

  return res.json();
}
