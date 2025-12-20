import Hero from "./components/hero"
import IntroGrid from "./components/introgrid"
import ImageMosaic from "./components/imagemosaic"
import FeaturedRecipes from "./components/featuredrecipes"
import LoginSection from "./components/loginsection"
import Footer from "./components/footer"
import PageTransition from "./components/pagetransition"

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <IntroGrid />
      <ImageMosaic />
      <FeaturedRecipes />
      <LoginSection />
      <Footer />
    </PageTransition>
  )
}
