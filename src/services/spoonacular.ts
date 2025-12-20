const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY

export const getRecipesByCategory = async (category: string) => {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${category}&number=12&apiKey=${API_KEY}`
  )

  if (!res.ok) throw new Error("Spoonacular murió un poco")

  return res.json()
}

