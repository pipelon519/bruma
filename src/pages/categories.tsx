import { Link } from "react-router-dom"
import Footer from "./components/footer"

import img10 from "/assets/img10.jpg"
import img7 from "/assets/img7.jpg"
import img11 from "/assets/img11.jpg"
import img12 from "/assets/img12.jpg"
import img13 from "/assets/img13.jpg"
import img6 from "/assets/img6.jpg"

type Category = {
  name: string
  query: string
  image: string
  accent: string
}

const categories: Category[] = [
  { name: "Postres", query: "postres", image: img10, accent: "bg-[#7AD0AC]" },
  { name: "Pastas", query: "pastas", image: img7, accent: "bg-[#F87171]" },
  { name: "Ensaladas", query: "ensaladas", image: img11, accent: "bg-[#A3B18A]" },
  { name: "Sopas", query: "sopas", image: img12, accent: "bg-[#7AD0AC]" },
  { name: "Snacks", query: "snacks", image: img13, accent: "bg-[#F87171]" },
  { name: "Bebidas", query: "bebidas", image: img6, accent: "bg-[#A3B18A]" },
]

export default function Categories() {
  return (
    <>

      <section className="py-24 bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-serif mb-16 text-center">
            Categorías de recetas
          </h1>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((cat, index) => (
              <div
                key={cat.name}
                className={`group relative rounded-[2rem] overflow-hidden shadow-lg cursor-pointer transition-all duration-300
                hover:scale-105 hover:shadow-2xl ${
                  index % 2 === 0 ? "rotate-1" : "-rotate-1"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-64 w-full object-cover"
                />

                <div
                  className={`absolute inset-0 ${cat.accent} mix-blend-multiply opacity-30`}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h2 className="text-white text-2xl font-serif">
                    {cat.name}
                  </h2>

                  <Link to={`/categories/${cat.query}`}>
                    <button className="mt-4 opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-6 py-2 rounded-full font-medium transition-opacity duration-300">
                      Ver recetas
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
