import img1 from "/assets/img1.jpg";
import img2 from "/assets/img2.jpg";
import img3 from "/assets/img3.jpg";
import img4 from "/assets/img4.jpg";
import img5 from "/assets/img5.jpg";
import img6 from "/assets/img6.jpg";
import { motion } from "framer-motion"

export default function ImageMosaic() {
    return (
      <motion.section>

        <section className="py-24  bg-[var(--accent)] rounded-4xl ml-2 mr-2 mt-2">
        <div className="mx-auto max-w-6xl px-6">
  
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
  
            {[
              img1,
              img2,
              img3,
              img4,
              img5,
              img6,
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square rounded-3xl overflow-hidden hover:scale-105 transition-all"
                
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
  
          </div>
  
        </div>
        </section>
      </motion.section>
    )
  }
  