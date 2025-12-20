import plato1 from "/assets/plato1.png";
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <motion.section>
    <section className="relative overflow-hidden">
    
    <div className="absolute inset-0 bg-[var(--accent)] rounded-4xl ml-2 mr-2"></div>

    <div className="relative z-10 mx-auto max-w-6xl px-6 py-32">
      <div className="grid md:grid-cols-2 gap-16 items-center">

        <div>
          <p className="font-serif text-2xl md:text-4xl leading-tight">
            Cocina con calma y encuentra tu<br />
            <h1 className="font-serif text-6xl md:text-8xl leading-tight font-light">Ingrediente</h1> 
          </p>

          <p className="mt-6 max-w-md text-lg opacity-80">
            recetas reales, errores honestos y preguntas que se hacen sin prisa
          </p>

          <button className="mt-10 inline-block rounded-full bg-[var(--bg)] px-8 py-4 text-xl font-medium hover:bg-[var(--tarjeta-1)] hover:font-bold  text-[var(--text)] tracking-wide transition-all transform hover:scale-105">
            explorar recetas
          </button>
        </div>

        <div className="relative h-[420px] flex items-center justify-center">
            <div className="absolute w-100 h-100 rounded-full bg-black/15 dark:bg-white/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <img src={plato1} alt="" className="relative z-10 w-full w-150" />
        </div>
      </div>
    </div>
  </section>
    </motion.section>
  )
}
