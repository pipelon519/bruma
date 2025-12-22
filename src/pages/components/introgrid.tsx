import { motion } from "framer-motion";
import { Speech, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: <Speech size={24} className="text-orange-500" />,
    title: "Honesta",
    description: "Recetas reales, sin filtros ni adornos. Solo cocina auténtica.",
  },
  {
    icon: <Sparkles size={24} className="text-orange-500" />,
    title: "Artística",
    description: "La belleza en cada plato. Composiciones que inspiran y deleitan.",
  },
  {
    icon: <Users size={24} className="text-orange-500" />,
    title: "Colaborativa",
    description: "Una comunidad que comparte, aprende y crece junta en la cocina.",
  },
];

export default function IntroGrid() {
  return (
    <motion.section 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative z-10 -mt-20 mx-auto max-w-5xl mb-24"
    >
      <div className="bg-white/60 dark:bg-black/50 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 border border-white/20">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4 ring-2 ring-orange-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-stone-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
