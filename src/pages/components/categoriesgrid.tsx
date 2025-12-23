import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// A predefined list of categories guarantees they will always be displayed.
const categories = [
  { name: "Postres", image: "/assets/plato1.png" },
  { name: "Pastas", image: "/assets/plato2.png" },
  { name: "Ensaladas", image: "/assets/plato3.png" },
  { name: "Sopas", image: "/assets/plato4.png" },
  { name: "Carnes", image: "/assets/plato5.png" },
];

export default function CategoriesGrid() {
  // The component is now simpler and more reliable.
  // It no longer needs to fetch data or handle loading states.

  return (
    <section className="w-auto bg-slate-50 dark:bg-slate-900 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:2rem_2rem] bg-center mx-2 rounded-3xl shadow-2xl px-3">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl text-center text-stone-800 dark:text-white mb-2">
          Explora por Categorías
        </h2>
        <p className="text-center text-stone-600 dark:text-stone-300 mb-12 max-w-2xl mx-auto">
          Desde desayunos energéticos hasta postres irresistibles. Encuentra tu próxima receta favorita navegando por nuestras colecciones.
        </p>

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
      </div>
    </section>
  );
}
