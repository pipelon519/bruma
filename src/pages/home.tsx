import Hero from "./components/hero";
import IntroGrid from "./components/introgrid"
import ImageMosaic from "./components/imagemosaic";
import FeaturedRecipes from "./components/featuredrecipes";
import LoginSection from "./components/loginsection";
import Footer from "./components/footer";




function App() {
  return (
    <>
    <Hero /> 
    <IntroGrid />
    <ImageMosaic/>
    <FeaturedRecipes/>
    <LoginSection/>
    <Footer/>
    </>
  );
}

export default App