import { Routes, Route } from "react-router-dom";
import Header from "./pages/components/header";
import Home from "./pages/home";
import Categories from "./pages/categories";
import CategoryDetailsPage from "./pages/categorydetails";
import RecipeDetail from "./pages/recipedetails";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SearchPage from "./pages/search";
import MyRecipesPage from "./pages/myrecipes"; // 1. Import the new page

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryName" element={<CategoryDetailsPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/my-recipes" element={<MyRecipesPage />} /> {/* 2. Add the route */}
        </Routes>
      </main>
    </div>
  );
}
