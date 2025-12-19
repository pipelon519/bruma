import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Categories from "./pages/categories";
import Header from "./pages/components/header";
import Footer from "./pages/components/footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
