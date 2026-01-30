import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BrightInDarkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const isMobile = window.innerWidth < 768;

    // Split text into lines for mobile, words for desktop
    let textContent: string;
    let textUnits: string[];
    
    if (isMobile) {
      // Mobile: Line-by-line with "darkness" separate
      textContent = "We can\nmake you\nbright\nin the\ndarkness";
      textUnits = textContent.split("\n");
    } else {
      // Desktop: Word-by-word
      textContent = "We can make you bright in the darkness";
      textUnits = textContent.split(" ");
    }
    
    // Clear existing content
    text.innerHTML = "";
    
    // Create spans for each character
    const allChars: HTMLSpanElement[] = [];
    
    if (isMobile) {
      // Mobile: Create line containers
      textUnits.forEach((line, lineIndex) => {
        const lineContainer = document.createElement("div");
        lineContainer.style.display = "block";
        lineContainer.style.marginBottom = lineIndex < textUnits.length - 1 ? "0.2em" : "0";
        
        const words = line.split(" ");
        words.forEach((word, wordIndex) => {
          const isBright = word === "bright";
          const isDark = word.includes("darkness");
          
          const wordContainer = document.createElement("span");
          wordContainer.style.display = "inline-block";
          wordContainer.style.marginRight = wordIndex < words.length - 1 ? "0.4em" : "0";
          
          word.split("").forEach((char, charIndex) => {
            const charSpan = document.createElement("span");
            charSpan.textContent = char;
            charSpan.style.display = "inline-block";
            charSpan.style.opacity = "0";
            
            if (isBright) {
              charSpan.style.color = "hsl(var(--foreground))";
              charSpan.style.textShadow = `
                0 0 15px rgba(255, 255, 255, 0.5),
                0 0 30px rgba(255, 255, 255, 0.4),
                0 0 45px rgba(255, 255, 255, 0.3),
                0 0 60px rgba(255, 255, 255, 0.15)
              `;
              charSpan.style.filter = "drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))";
            } else if (isDark) {
              const progress = charIndex / (word.length - 1);
              const lightness = 25 - (progress * 15);
              charSpan.style.color = `hsl(0, 0%, ${lightness}%)`;
            } else {
              charSpan.style.color = "hsl(var(--foreground))";
            }
            
            wordContainer.appendChild(charSpan);
            allChars.push(charSpan);
          });
          
          lineContainer.appendChild(wordContainer);
        });
        
        text.appendChild(lineContainer);
      });
    } else {
      // Desktop: Create word containers (original)
      textUnits.forEach((word, wordIndex) => {
        const isBright = word === "bright";
        const isDark = word === "darkness";
        
        const wordContainer = document.createElement("span");
        wordContainer.style.display = "inline-block";
        wordContainer.style.marginRight = wordIndex < textUnits.length - 1 ? "0.4em" : "0";
        
        word.split("").forEach((char, charIndex) => {
          const charSpan = document.createElement("span");
          charSpan.textContent = char;
          charSpan.style.display = "inline-block";
          charSpan.style.opacity = "0";
          
          if (isBright) {
            charSpan.style.color = "hsl(var(--foreground))";
            charSpan.style.textShadow = `
              0 0 15px rgba(255, 255, 255, 0.5),
              0 0 30px rgba(255, 255, 255, 0.4),
              0 0 45px rgba(255, 255, 255, 0.3),
              0 0 60px rgba(255, 255, 255, 0.15)
            `;
            charSpan.style.filter = "drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))";
          } else if (isDark) {
            const progress = charIndex / (word.length - 1);
            const lightness = 25 - (progress * 15);
            charSpan.style.color = `hsl(0, 0%, ${lightness}%)`;
          } else {
            charSpan.style.color = "hsl(var(--foreground))";
          }
          
          wordContainer.appendChild(charSpan);
          allChars.push(charSpan);
        });
        
        text.appendChild(wordContainer);
      });
    }

    // Create scroll-triggered typing animation with pinning
    const scrollTween = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: isMobile ? "+=3000px" : "+=4000px", // Shorter on mobile for quicker exit
        scrub: 1,
        pin: true,
      },
    });

    // Animate each character appearing letter by letter
    allChars.forEach((char, index) => {
      scrollTween.to(
        char,
        {
          opacity: 1,
          duration: 0.1,
          ease: "none",
        },
        index * 0.08
      );
    });

    // Add scroll buffer at end - hold text visible before unpinning
    scrollTween.to({}, { duration: 0.3 });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen flex items-center justify-center px-4 md:px-12 relative overflow-hidden bg-background"
      style={{ marginBottom: window.innerWidth < 768 ? '10vh' : '0' }}
    >
      {/* Main text - Full screen with letter-by-letter reveal - EVEN BIGGER */}
      <div className="relative z-10 text-center w-full">
        <h2
          ref={textRef}
          className="font-hero text-[15vw] md:text-[10vw] lg:text-[8vw] font-bold uppercase leading-[1.5] md:leading-[1.1]"
        />
      </div>
    </section>
  );
};

export default BrightInDarkSection;
