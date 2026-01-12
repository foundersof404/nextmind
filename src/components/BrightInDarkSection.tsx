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

    // Split text into characters
    const textContent = "We can make you bright in the darkness";
    const words = textContent.split(" ");
    
    // Clear existing content
    text.innerHTML = "";
    
    // Create spans for each character
    const allChars: HTMLSpanElement[] = [];
    words.forEach((word, wordIndex) => {
      const isBright = word === "bright";
      const isDark = word === "darkness";
      
      // Wrap each word in a container for spacing
      const wordContainer = document.createElement("span");
      wordContainer.style.display = "inline-block";
      wordContainer.style.marginRight = wordIndex < words.length - 1 ? "0.4em" : "0";
      
      word.split("").forEach((char, charIndex) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = "0";
        
        // Apply glow only to "bright" word (reduced brightness)
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
          // Apply dark grey to black gradient for "darkness" word to reflect darkness
          const progress = charIndex / (word.length - 1); // 0 to 1
          const lightness = 25 - (progress * 15); // From 25% (dark grey) to 10% (very dark/black)
          charSpan.style.color = `hsl(0, 0%, ${lightness}%)`;
        } else {
          charSpan.style.color = "hsl(var(--foreground))";
        }
        
        wordContainer.appendChild(charSpan);
        allChars.push(charSpan);
      });
      
      text.appendChild(wordContainer);
    });

    // Create scroll-triggered typing animation with pinning
    // The section will stay pinned until all text has appeared
    const scrollTween = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=4000px", // Fixed scroll distance - section stays pinned during this scroll
        scrub: 1,
        pin: true,
      },
    });

    // Animate each character appearing letter by letter (much slower)
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
      className="h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden bg-background"
    >
      {/* Main text */}
      <div className="relative z-10 text-center">
        <h2
          ref={textRef}
          className="font-hero text-[8vw] md:text-[10vw] lg:text-[8vw] font-bold uppercase leading-[1.1]"
        />
      </div>
    </section>
  );
};

export default BrightInDarkSection;
