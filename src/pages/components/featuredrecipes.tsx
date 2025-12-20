import { recipes } from "../../data/recipes"
import { motion } from "framer-motion"


export default function FeaturedRecipes() {
  return (
    <motion.section initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}>
        <section className="py-28 bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-6">

        {/* Título */}
        <div className="mb-20 text-center">
          <h2 className="font-serif text-5xl md:text-6xl">
            recetas destacadas
          </h2>
          <p className="mt-4 text-lg opacity-70 max-w-xl mx-auto">
            platos que no buscan impresionar, solo salir bien
          </p>
        </div>

        {/* Recetas */}
        <div className="flex flex-col gap-32">
          {recipes.map((recipe, index) => {
            const reverse = index % 2 !== 0

            return (
              <div
                key={recipe.id}
                className={`grid md:grid-cols-2 gap-16 items-center ${
                  reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Imagen */}
                <div className={`${reverse ? "md:order-2" : ""}`}>
                  <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-black/5 dark:bg-white/5">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Texto */}
                <div className={`${reverse ? "md:order-1" : ""}`}>
                  <h3 className="font-serif text-4xl md:text-5xl leading-tight">
                    {recipe.title}
                  </h3>

                  <p className="mt-6 text-lg opacity-75 max-w-md">
                    {recipe.description}
                  </p>

                  <div className="mt-8 flex gap-6 text-sm opacity-70">
                    <span>⏱ {recipe.time}</span>
                    <span>🔥 {recipe.difficulty}</span>
                  </div>

                  <button className="mt-10 inline-block rounded-full border border-current px-8 py-4 text-sm tracking-wide hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
                    ver receta
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
    </motion.section>
  
  )
}
