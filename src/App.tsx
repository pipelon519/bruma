import { Routes, Route } from "react-router-dom"
import Header from "./pages/components/header"
import Home from "./pages/home"
import Categories from "./pages/categories"
import CategoryRecipes from "./pages/components/categoryrecipes"
import RecipeDetail from "./pages/recipedetails"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<CategoryRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
    </div>
  )
}
