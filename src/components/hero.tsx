export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      
      {/* Fondo con pincel */}
      <div className="absolute inset-0 bg-[var(--accent)]"></div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h1 className="font-serif text-8xl md:text-6xl leading-tight">
              Cocinar también <br /> es contar algo
            </h1>
           


            <p className="mt-6 max-w-md text-lg opacity-80">
              recetas reales, errores honestos y preguntas que se hacen sin prisa
            </p>

            <button className="mt-10 inline-block rounded-full bg-[var(--bg)] px-8 py-4 text-sm font-medium tracking-wide">
              explorar recetas
            </button>
          </div>

          <div className="relative h-[420px] flex items-center justify-center">
              <div className="absolute w-100 h-100 rounded-full bg-black/15 dark:bg-white/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <img src="src/assets/plato1.png" alt="" className="relative z-10 w-full w-150" />
          </div>
        </div>
      </div>
    </section>
  )
}
