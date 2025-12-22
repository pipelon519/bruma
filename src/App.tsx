
import { Routes, Route } from "react-router-dom";
import Header from "./pages/components/header";
import Home from "./pages/home";
import Categories from "./pages/categories";
import CategoryDetailsPage from "./pages/categorydetails";
import RecipeDetail from "./pages/recipedetails";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SearchPage from "./pages/search";
import MyRecipesPage from "./pages/myrecipes";
import ProtectedRoute from "./pages/components/ProtectedRoute";
import AddRecipePage from "./pages/addrecipe";
import ProfilePage from "./pages/profile";
import EditRecipePage from "./pages/editrecipe"; // 1. Import EditRecipePage

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryName" element={<CategoryDetailsPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-recipes" element={<MyRecipesPage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-recipe/:id" element={<EditRecipePage />} /> {/* 2. Add EditRecipePage Route */}
          </Route>
        </Routes>
      </main>
    </div>
  );
}
