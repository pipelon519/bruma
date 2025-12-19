export default function ImageMosaic() {
    return (
      <section className="py-24  bg-[var(--accent)] rounded-4xl ml-2 mr-2 mt-2">
        <div className="mx-auto max-w-6xl px-6">
  
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
  
            {[
              "src/assets/img1.jpg",
              "src/assets/img2.jpg",
              "src/assets/img3.jpg",
              "src/assets/img4.jpg",
              "src/assets/img5.jpg",
              "src/assets/img6.jpg",
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
    )
  }
  