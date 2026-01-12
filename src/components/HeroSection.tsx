import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    // Create the revealing animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    // Scale up the text massively to reveal content through it
    tl.to(text, {
      scale: 20,
      duration: 1,
      ease: "power2.inOut",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Generate random positions for metallic dots
  const dots = [
    { top: '15%', left: '10%', size: 8, delay: 0 },
    { top: '25%', left: '85%', size: 6, delay: 0.5 },
    { top: '70%', left: '15%', size: 10, delay: 1 },
    { top: '80%', left: '80%', size: 5, delay: 1.5 },
    { top: '40%', left: '5%', size: 7, delay: 0.3 },
    { top: '60%', left: '92%', size: 9, delay: 0.8 },
    { top: '10%', left: '60%', size: 4, delay: 1.2 },
    { top: '85%', left: '40%', size: 6, delay: 0.6 },
    { top: '35%', left: '95%', size: 8, delay: 1.8 },
    { top: '55%', left: '8%', size: 5, delay: 0.2 },
  ];

  return (
    <section 
      ref={sectionRef}
      className="h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden bg-background"
    >
      {/* Metallic 3D dots */}
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-pulse"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: `radial-gradient(circle at 30% 30%, 
              hsl(220, 20%, 90%) 0%, 
              hsl(220, 15%, 70%) 40%, 
              hsl(220, 10%, 50%) 70%, 
              hsl(220, 8%, 30%) 100%)`,
            boxShadow: `
              0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.3),
              inset 0 -${dot.size / 4}px ${dot.size / 3}px rgba(0, 0, 0, 0.2),
              inset 0 ${dot.size / 4}px ${dot.size / 3}px rgba(255, 255, 255, 0.3)
            `,
            animationDelay: `${dot.delay}s`,
            animationDuration: '3s',
          }}
        />
      ))}

      {/* Main headline with reveal effect */}
      <div className="text-center fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 50 }}>
        <h1 
          ref={textRef}
          className="font-hero text-[15vw] md:text-[18vw] lg:text-[16vw] font-bold uppercase leading-[0.85] tracking-tight"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            mixBlendMode: 'difference',
          }}
        >
          LET'S BUILD
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
