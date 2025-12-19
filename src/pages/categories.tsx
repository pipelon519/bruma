type Category = {
    name: string;
    image: string;
    accent: string;
  }
  
  const categories: Category[] = [
    { name: "Postres", image: "./assets/img10.jpg", accent: "bg-[#7AD0AC]" },
    { name: "Pastas", image: "./assets/img7.jpg", accent: "bg-[#F87171]" },
    { name: "Ensaladas", image: "./assets/img11.jpg", accent: "bg-[#A3B18A]" },
    { name: "Sopas", image: "./assets/img12.jpg", accent: "bg-[#7AD0AC]" },
    { name: "Snacks", image: "./assets/img13.jpg", accent: "bg-[#F87171]" },
    { name: "Bebidas", image: "./assets/img6.jpg", accent: "bg-[#A3B18A]" },
  ];
  import CategoriesHeader from "./components/categoriesheader";
  import Footer from "./components/footer";
  export default function Categories() {
    return (
      <>
      <CategoriesHeader/>
      <section className="py-24 bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-serif mb-16 text-center">Categorías de recetas</h1>
  
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`group relative rounded-[2rem] overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300
                  hover:scale-105 hover:shadow-2xl ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
              >
                {/* Imagen */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-64 w-full object-cover"
                />
  
                {/* Overlay de color acento */}
                <div className={`absolute inset-0 ${cat.accent} mix-blend-multiply opacity-30`}></div>
  
                {/* Texto */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="text-white text-2xl font-serif">{cat.name}</h2>
                  
                  {/* Botón que aparece al hover */}
                  <button className="mt-4 opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-6 py-2 rounded-full font-medium transition-opacity duration-300">
                    Ver recetas
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
      </>
    );
  }
  