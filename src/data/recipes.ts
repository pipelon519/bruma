export const recipes = [
  {
    id: "pasta-1",
    title: "Pasta honesta para días sin ganas",
    description:
      "Una pasta simple, sin pretensiones, para cuando cocinar es más un acto de cuidado que de entusiasmo.",
    time: "25 min",
    difficulty: "Fácil",
    category: "pastas", // Corrected: singular to plural
    image: "/assets/recetas/pasta.jpg",
    ingredients: [
      "200 g de pasta",
      "2 dientes de ajo",
      "Aceite de oliva",
      "Sal",
      "Queso rallado (opcional)",
    ],
    steps: [
      "Pon agua con sal a hervir. Que sepa a mar.",
      "Cocina la pasta hasta que esté al dente.",
      "Sofríe el ajo en aceite a fuego bajo. No lo quemes.",
      "Mezcla todo, prueba y ajusta.",
      "Sirve y come sin culpa.",
    ],
    notes:
      "Si te pasas de ajo, agrega un poco de agua de la pasta y baja el fuego. Todo tiene arreglo.",
  },
  {
    id: "snack-1",
    title: "Tostada con aguacate y lo que pilles",
    description:
      "El desayuno (o cena) que nunca falla. Una oda a la improvisación y al buen aceite de oliva.",
    time: "10 min",
    difficulty: "Elemental",
    category: "snacks", // Corrected: belongs to snacks
    image: "/assets/recetas/tostada.jpg",
    ingredients: [
      "1 rebanada de buen pan",
      "1/2 aguacate",
      "Aceite de oliva virgen extra",
      "Sal en escamas",
      "Pimienta negra",
      "Limón (un chorrito)",
    ],
    steps: [
      "Tuesta el pan hasta que cruja pero no se rompa los dientes.",
      "Mientras, machaca el aguacate con un tenedor. No uses batidora, queremos tropezones.",
      "Añade sal, pimienta y limón al aguacate. Prueba.",
      "Unta el aguacate sobre el pan tostado. Sé generoso.",
      "Riega con un buen chorro de aceite de oliva. Que brille.",
    ],
    notes:
      "Funciona con cualquier cosa que tengas por la nevera: tomate en rodajas, un huevo a la plancha, unas lascas de salmón...",
  },
  {
    id: "sopa-1",
    title: "Sopa de lentejas para reconstruir el alma",
    description:
      "Más que una receta, un abrazo en forma de plato. De las que hacía tu abuela, pero con menos misterio.",
    time: "50 min",
    difficulty: "Fácil",
    category: "sopas", // Corrected: new category
    image: "/assets/recetas/lentejas.jpg",
    ingredients: [
      "250 g de lentejas pardinas",
      "1 cebolla",
      "2 zanahorias",
      "1 pimiento verde",
      "2 dientes de ajo",
      "1 hoja de laurel",
      "Pimentón dulce",
      "Aceite de oliva",
      "Sal",
    ],
    steps: [
      "Deja las lentejas en remojo si tienes tiempo. Si no, lávalas bien y confía.",
      "Pica todas las verduras en trozos pequeños. Sin miedo.",
      "En una olla, sofríe la cebolla y el ajo con aceite. Cuando estén blanditos, añade el resto de verduras.",
      "Añade una cucharadita de pimentón y remueve rápido para que no se queme.",
      "Echa las lentejas, el laurel y cubre con agua (unos 3 dedos por encima).",
      "Lleva a ebullición y luego baja el fuego. Deja que chup-chup durante 40-50 minutos, hasta que estén tiernas.",
      "Sazona al final. Dicen que así no se despellejan.",
    ],
    notes:
      "Si le añades un chorizo, la cosa se pone seria. Si quieres espesar el caldo, saca un par de cucharadas de lentejas y verduras, tritúralas y vuelve a añadirlas.",
  },
  {
    id: "ensalada-1",
    title: "Ensalada de lo que sea que haya en la nevera",
    description:
      "Una ensalada que te salva la vida y te limpia la conciencia. No hay reglas, solo ingredientes frescos.",
    time: "15 min",
    difficulty: "Ridículamente fácil",
    category: "ensaladas", // Corrected: singular to plural
    image: "/assets/recetas/ensalada.jpg",
    ingredients: [
      "Hojas verdes (lechuga, espinacas, rúcula...)",
      "Tomates cherry",
      "Pepino",
      "Cebolla morada",
      "Un puñado de nueces",
      "Queso feta o el que te guste",
    ],
    steps: [
      "Lava y seca bien las hojas verdes. Esto es importante.",
      "Corta el resto de ingredientes como más te guste: en rodajas, en cubos, en juliana... a tu aire.",
      "Mezcla todo en un bol grande.",
      "Para el aliño: 3 partes de aceite por 1 de vinagre, sal y pimienta. Agita en un bote y listo.",
      "Aliña justo antes de servir para que no se ponga mustio.",
    ],
    notes:
      "Añade fruta (manzana, mango), legumbres (garbanzos de bote), o restos de pollo asado. Esta ensalada es un lienzo en blanco.",
  },
]
