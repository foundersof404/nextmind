import { useState, useRef, useEffect } from "react";
import MenuOverlay from "./MenuOverlay";

const navItems = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuHovering, setIsMenuHovering] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const nav = navRef.current;
    if (nav) {
      nav.addEventListener("mousemove", handleMouseMove);
      nav.addEventListener("mouseenter", handleMouseEnter);
      nav.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (nav) {
        nav.removeEventListener("mousemove", handleMouseMove);
        nav.removeEventListener("mouseenter", handleMouseEnter);
        nav.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Close up navigation when scrolled down
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4">
        <div className="flex items-center justify-center gap-0 md:gap-2">
          {/* Brand Section */}
          <a
            href="/"
            className="flex items-center gap-2 px-4 h-10 rounded-lg bg-background/90 backdrop-blur-sm border border-foreground/10 hover:border-orange-500/50 transition-colors duration-300 group relative z-10"
            style={{
              boxShadow: isHovering && mousePosition.x < 150
                ? `0 0 20px rgba(255, 140, 0, 0.4), 0 0 40px rgba(255, 140, 0, 0.2)`
                : "none",
            }}
          >
            <span className="text-foreground text-xs md:text-sm tracking-widest font-medium">
              ɴᴇxᴛᴍɪɴᴅ
            </span>
          </a>

          {/* Glassmorphism Navigation */}
          <nav
            ref={navRef}
            className="relative px-6 h-10 rounded-lg flex items-center gap-2 md:gap-4"
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              position: "relative",
              overflow: "hidden",
              width: isScrolled ? "0" : "auto",
              opacity: isScrolled ? 0 : 1,
              paddingLeft: isScrolled ? "0" : "1.5rem",
              paddingRight: isScrolled ? "0" : "1.5rem",
              height: "2.5rem",
              margin: isScrolled ? "0" : "0",
              transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), padding 1.2s cubic-bezier(0.4, 0, 0.2, 1), margin 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: isScrolled ? "none" : "auto",
            }}
          >
            {/* Light gradient that follows mouse */}
            {isHovering && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y}px`,
                  width: "200px",
                  height: "200px",
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(circle, rgba(255, 140, 0, 0.4) 0%, rgba(255, 140, 0, 0.2) 30%, transparent 70%)`,
                  transition: "opacity 0.3s ease",
                  opacity: 1,
                }}
              />
            )}

            {/* Animated border glow that follows mouse */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                border: isHovering ? "1px solid rgba(255, 140, 0, 0.5)" : "1px solid transparent",
                boxShadow: isHovering
                  ? `0 0 15px rgba(255, 140, 0, 0.4), 0 0 30px rgba(255, 140, 0, 0.2), inset 0 0 60px rgba(255, 140, 0, 0.1)`
                  : "none",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                borderRadius: "8px",
                background: isHovering
                  ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 140, 0, 0.15), transparent 40%)`
                  : "transparent",
              }}
            />

            {/* Navigation Links */}
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative z-10 px-3 md:px-4 py-1.5 text-foreground text-xs md:text-sm font-medium tracking-wider uppercase hover:text-orange-300 transition-colors duration-300 rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Menu Button - 3 Dots that animate to + on hover */}
          <button
            onClick={() => setMenuOpen(true)}
            onMouseEnter={() => setIsMenuHovering(true)}
            onMouseLeave={() => setIsMenuHovering(false)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-background/90 backdrop-blur-sm border border-foreground/10 text-foreground transition-all duration-300 group relative z-10"
            style={{
              borderColor: isMenuHovering ? "rgba(255, 140, 0, 0.5)" : "rgba(255, 255, 255, 0.1)",
              boxShadow: isMenuHovering
                ? `0 0 15px rgba(255, 140, 0, 0.4), 0 0 30px rgba(255, 140, 0, 0.2)`
                : "none",
            }}
          >
            {/* Container for dots animation - 3 dots that form a + */}
            <div className="relative w-5 h-5 flex items-center justify-center">
              {/* Dot 1 - Starts left-center, moves to top-center (vertical line of +) */}
              <span
                className="absolute w-1.5 h-1.5 rounded-full bg-current"
                style={{
                  left: isMenuHovering ? "50%" : "25%",
                  top: isMenuHovering ? "25%" : "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "left 0.3s ease, top 0.3s ease",
                }}
              />
              {/* Dot 2 - Center (always stays at center - forms the intersection of +) */}
              <span
                className="absolute w-1.5 h-1.5 rounded-full bg-current"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* Dot 3 - Starts right-center, moves to bottom-center (vertical line of +) */}
              <span
                className="absolute w-1.5 h-1.5 rounded-full bg-current"
                style={{
                  left: isMenuHovering ? "50%" : "75%",
                  top: isMenuHovering ? "75%" : "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "left 0.3s ease, top 0.3s ease",
                }}
              />
              {/* Dot 4 - Fades in at left-center (horizontal line of +) */}
              <span
                className="absolute w-1.5 h-1.5 rounded-full bg-current"
                style={{
                  left: "25%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: isMenuHovering ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
              {/* Dot 5 - Fades in at right-center (horizontal line of +) */}
              <span
                className="absolute w-1.5 h-1.5 rounded-full bg-current"
                style={{
                  left: "75%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: isMenuHovering ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
