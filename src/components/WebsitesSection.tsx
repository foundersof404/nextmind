import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WebsitesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = wordsRef.current.filter(Boolean) as HTMLParagraphElement[];
    
    words.forEach((wordElement, wordIndex) => {
      const text = wordElement.textContent || "";
      wordElement.textContent = "";
      
      // Split text into individual letters
      const letters = text.split("").map((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.className = "inline-block";
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
        wordElement.appendChild(span);
        return span;
      });

      // Create timeline for this word - letters disappear from top to bottom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `top+=${wordIndex * 10}% top`,
          end: `+=${100 + wordIndex * 20}%`,
          scrub: 1,
          toggleActions: "play none none reset",
        },
      });

      // Animate letters disappearing from top to bottom
      letters.forEach((letter, letterIndex) => {
        tl.to(
          letter,
          {
            opacity: 0,
            y: 20,
            duration: 0.15,
            ease: "power2.in",
          },
          letterIndex * 0.08
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const wordsData = ["Websites", "that", "excite", "engage", "delight"];

  const dots = [
    { top: '15%', left: '10%', size: 8, delay: 0, type: 'metallic' },
    { top: '25%', left: '85%', size: 6, delay: 0.5, type: 'metallic' },
    { top: '70%', left: '15%', size: 10, delay: 1, type: 'orange' },
    { top: '80%', left: '80%', size: 5, delay: 1.5, type: 'metallic' },
    { top: '40%', left: '5%', size: 7, delay: 0.3, type: 'orange' },
    { top: '60%', left: '92%', size: 9, delay: 0.8, type: 'metallic' },
    { top: '10%', left: '60%', size: 4, delay: 1.2, type: 'metallic' },
    { top: '85%', left: '40%', size: 6, delay: 0.6, type: 'orange' },
    { top: '35%', left: '95%', size: 8, delay: 1.8, type: 'metallic' },
    { top: '55%', left: '8%', size: 5, delay: 0.2, type: 'metallic' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-[200vh] flex items-center justify-center py-12 md:py-16 px-6 md:px-12 lg:px-24 -mt-[100vh] -mb-16 md:-mb-20 relative overflow-hidden"
    >
      {/* Metallic 3D dots with some orange */}
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-pulse"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: dot.type === 'orange'
              ? `radial-gradient(circle at 30% 30%, 
                  hsl(30, 100%, 65%) 0%, 
                  hsl(30, 100%, 55%) 40%, 
                  hsl(30, 90%, 45%) 70%, 
                  hsl(30, 80%, 35%) 100%)`
              : `radial-gradient(circle at 30% 30%, 
                  hsl(220, 20%, 90%) 0%, 
                  hsl(220, 15%, 70%) 40%, 
                  hsl(220, 10%, 50%) 70%, 
                  hsl(220, 8%, 30%) 100%)`,
            boxShadow: dot.type === 'orange'
              ? `
                0 ${dot.size / 4}px ${dot.size / 2}px rgba(255, 140, 0, 0.4),
                inset 0 -${dot.size / 4}px ${dot.size / 3}px rgba(0, 0, 0, 0.3),
                inset 0 ${dot.size / 4}px ${dot.size / 3}px rgba(255, 180, 100, 0.4)
              `
              : `
                0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.3),
                inset 0 -${dot.size / 4}px ${dot.size / 3}px rgba(0, 0, 0, 0.2),
                inset 0 ${dot.size / 4}px ${dot.size / 3}px rgba(255, 255, 255, 0.3)
              `,
            animationDelay: `${dot.delay}s`,
            animationDuration: '3s',
          }}
        />
      ))}

      <div className="text-center sticky top-1/2 -translate-y-1/2 relative z-10">
        <div className="font-hero text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[1.1] tracking-tight space-y-2 md:space-y-4">
          {wordsData.map((word, index) => (
            <p
              key={index}
              ref={(el) => (wordsRef.current[index] = el)}
              className="text-hero"
            >
              {word}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsitesSection;
