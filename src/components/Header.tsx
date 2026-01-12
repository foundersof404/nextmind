import { useState } from "react";
import Logo from "@/assets/NextMindLogo.png";
import MenuOverlay from "./MenuOverlay";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img 
              src={Logo} 
              alt="Next Mind" 
              className="h-8 md:h-10 w-auto"
            />
            <span className="text-foreground text-sm md:text-base tracking-widest font-medium">
              ɴᴇxᴛᴍɪɴᴅ
            </span>
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300 group"
          >
            <span className="text-sm font-medium tracking-wider uppercase">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="block w-6 h-0.5 bg-current transition-transform duration-300 group-hover:translate-x-1" />
              <span className="block w-6 h-0.5 bg-current transition-transform duration-300 group-hover:-translate-x-1" />
            </div>
          </button>
        </div>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
