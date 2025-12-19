import Header from "./components/header";
import Hero from "./components/hero";
import IntroGrid from "./components/introgrid"
import ImageMosaic from "./components/imagemosaic";
import FeaturedRecipes from "./components/featuredrecipes";
import LoginSection from "./components/loginsection";
import Footer from "./components/footer";




function App() {
  return (
    <>
    <Header />
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