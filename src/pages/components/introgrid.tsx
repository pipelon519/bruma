import plato1 from "/assets/plato1.png";

export default function IntroGrid() {
    return (
      <section className="bg-[var(--bg2)] py-24 h-full rounded-4xl ml-2 mr-2 mt-2">
        <div className="mx-auto max-w-6xl px-6">
  
          <div className="mb-16 w-full flex flex-col items-center justify-center">
            <h2 className="font-serif text-5xl text-center">
              no es un recetario
            </h2>
            <p className="mt-4 text-lg opacity-70">
              es un lugar donde la gente cocina, pregunta, se equivoca y sigue
            </p>
          </div>
  
          <div className="grid gap-8 md:grid-cols-3">
  
            <div className="rounded-3xl bg-[var(--tarjeta-2)] p-8">
              <img src={plato1} alt="" />
              <h3 className="text-2xl font-bold text-center">Explorar</h3>
              <p className="mt-3 opacity-70">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, molestiae! Voluptatum voluptas corporis culpa consequuntur.
              </p>
            </div>
  
            <div className="rounded-3xl bg-[var(--tarjeta-1)] p-8">
              <img src={plato1} alt="" />
              <h3 className="text-2xl font-bold text-center">preguntar</h3>
              <p className="mt-3 opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque laborum fugiat magnam temporibus eum ut.
              </p>
            </div>
  
            <div className="rounded-[10%] bg-[var(--tarjeta-2)] bg-600 p-8">
              <img src={plato1} alt="" />
              <h3 className="text-2xl font-bold text-center">compartir</h3>
              <p className="mt-3 opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque non doloribus expedita! Earum, similique rerum?
              </p>
            </div>
  
          </div>
  
        </div>
      </section>
    )
  }
  