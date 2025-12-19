import img7 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";

type Recipe = {
    title: string
    description: string
    time: string
    level: string
    image: string
  }
  
  const recipes: Recipe[] = [
    {
      title: "pasta en salsa roja",
      description:
        "una receta sencilla para cuando quieres comer bien sin pensar demasiado",
      time: "25 min",
      level: "fácil",
      image: img7,
    },
    {
      title: "arroz chino casero",
      description:
        "con paciencia, fuego medio y errores que también cuentan",
      time: "45 min",
      level: "media",
      image: img8,
    },
    {
      title: "bocados de pan",
      description:
        "sin horno, sin drama y con olor a casa",
      time: "20 min",
      level: "fácil",
      image: img9,
    },
  ]
  
  export default function FeaturedRecipes() {
    return (
      <section className="py-28 h-full mb-0">
        <div className="mx-auto max-w-6xl px-6 space-y-15 ">
          <h2 className="font-serif text-4xl text-center">Recetas destacadas</h2>
          {recipes.map((recipe, index) => (
            <div
              key={index}
              
              className={ `flex flex-col gap-12 items-center
                md:flex-row ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }
                bg-[var(--bg2)] h-full rounded-4xl p-4 mb-5`}
                
            >
              {/* Imagen */}
              <div className="w-full md:w-1/2">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
  
              {/* Texto */}
              <div className="w-full md:w-1/2 max-w-md">
                <h3 className="font-serif text-3xl">
                  {recipe.title}
                </h3>
  
                <p className="mt-4 text-xl opacity-75">
                  {recipe.description}
                </p>
  
                <div className="mt-6 flex gap-6 text-sm opacity-70">
                  <span>{recipe.time}</span>
                  <span>{recipe.level}</span>
                </div>
                <button className="mt-10 inline-block rounded-full bg-[var(--bg)] px-8 py-4 text-xl font-medium hover:bg-[var(--tarjeta-1)] hover:font-bold  text-[var(--text)] tracking-wide transition-all ">
                  explorar
                </button>
              </div>
            </div>
          ))}
  
        </div>
      </section>
    )
  }
  