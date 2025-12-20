import { Routes, Route } from "react-router-dom";
import Header from "./pages/components/header";
import Home from "./pages/home";
import Categories from "./pages/categories";
import CategoryDetailsPage from "./pages/categorydetails"; // 1. Import the new page
import RecipeDetail from "./pages/recipedetails";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          
          {/* 2. Updated route to point to the correct component and a clearer param name */}
          <Route path="/categories/:categoryName" element={<CategoryDetailsPage />} />
          
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}
