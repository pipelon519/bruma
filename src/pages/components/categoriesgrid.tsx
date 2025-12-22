import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";

// Mock data serves as a fallback
const mockCategories = [
  { name: "Postres", image: "/assets/plato1.png" },
  { name: "Pastas", image: "/assets/plato2.png" },
  { name: "Ensaladas", image: "/assets/plato3.png" },
  { name: "Sopas", image: "/assets/plato4.png" },
  { name: "Carnes", image: "/assets/plato5.png" },
];

// We need to define the structure of our category objects
interface Category {
  name: string;
  image: string;
}

export default function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("category");

        if (error || !data) {
          throw new Error(error?.message || "Error fetching categories");
        }

        const categoryCounts = data.reduce((acc, { category }) => {
          if (category) {
            acc[category] = (acc[category] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        const topCategories = Object.entries(categoryCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([name], index) => ({
            name,
            image: mockCategories[index]?.image || `/assets/plato${index + 1}.png`, // Fallback image
          }));

        if (topCategories.length > 0) {
          setCategories(topCategories);
        } else {
          // If no categories are found, use the mock data as a fallback
          setCategories(mockCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // In case of any error, revert to mock data to ensure UI is not broken
        setCategories(mockCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Your custom styling is preserved here
  return (
    <section className="w-auto bg-slate-50 dark:bg-slate-900 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:2rem_2rem] bg-center mx-2 rounded-3xl shadow-2xl px-3">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl text-center text-stone-800 dark:text-white mb-2">
          Explora por Categorías
        </h2>
        <p className="text-center text-stone-600 dark:text-stone-300 mb-12 max-w-2xl mx-auto">
          Desde desayunos energéticos hasta postres irresistibles. Encuentra tu próxima receta favorita navegando por nuestras colecciones.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-[500px]">
            <p className="text-stone-500 dark:text-stone-400">Cargando categorías...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-4 md:gap-6 h-[500px]">
            {categories.map((category, index) => {
              const spanClasses = [
                "lg:col-span-3 lg:row-span-1",
                "lg:col-span-4 lg:row-span-2",
                "lg:col-span-3 lg:row-span-1",
                "lg:col-span-5 lg:row-span-1",
                "lg:col-span-5 lg:row-span-1",
              ];
              const textAlignment = [
                "items-start justify-end",
                "items-start justify-start",
                "items-end justify-start",
                "items-center justify-center",
                "items-end justify-end",
              ];

              return (
                <motion.div
                  key={category.name}
                  className={`col-span-2 row-span-1 ${spanClasses[index]}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <NavLink
                    to={`/categories/${category.name}`}
                    className="group relative w-full h-full flex rounded-2xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                    <div className={`relative w-full h-full flex p-6 ${textAlignment[index]}`}>
                      <h3 className="text-white text-2xl font-bold tracking-tight">
                        {category.name}
                      </h3>
                    </div>
                  </NavLink>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
