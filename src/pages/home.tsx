import Hero from "./components/hero";
import IntroGrid from "./components/introgrid";
import CategoriesGrid from "./components/categoriesgrid";
import ImageMosaic from "./components/imagemosaic";
import FeaturedRecipes from "./components/featuredrecipes";
import LoginSection from "./components/loginsection";
import Footer from "./components/footer";
import PageTransition from "./components/pagetransition";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth(); // Check for active user

  return (
    <PageTransition>
      {!user && <Hero />} {/* Show only if no user is logged in */}
      <IntroGrid />
      <CategoriesGrid />
      <ImageMosaic />
      <FeaturedRecipes />
      {!user && <LoginSection />} {/* Show only if no user is logged in */}
      <Footer />
    </PageTransition>
  );
}
