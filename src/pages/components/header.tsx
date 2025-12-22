
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className="w-full h-16 md:h-20 px-4 sm:px-6 md:px-8 bg-white md:bg-white/90 md:backdrop-blur-sm sticky top-0 z-30 border-b border-stone-100">
      {/* --- Show DesktopNav on medium screens and up --- */}
      <div className="hidden md:block h-full">
        <DesktopNav />
      </div>

      {/* --- Show MobileNav on small screens --- */}
      <div className="md:hidden h-full">
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
