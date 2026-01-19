import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CollisionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);

  // Image URLs from Unsplash - Better imagery
  const leftImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop"; // Creativity/Art brushes
  const rightImage = "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop"; // Design/Graphics tablet

  // Metallic 3D dots for background with some orange
  const dots = [
    { top: '15%', left: '10%', size: 8, delay: 0, type: 'metallic' },
    { top: '25%', left: '85%', size: 6, delay: 0.5, type: 'orange' },
    { top: '70%', left: '15%', size: 10, delay: 1, type: 'metallic' },
    { top: '80%', left: '80%', size: 5, delay: 1.5, type: 'orange' },
    { top: '40%', left: '8%', size: 7, delay: 0.3, type: 'metallic' },
    { top: '60%', left: '90%', size: 9, delay: 0.8, type: 'metallic' },
    { top: '10%', left: '60%', size: 4, delay: 1.2, type: 'metallic' },
    { top: '85%', left: '40%', size: 6, delay: 0.6, type: 'orange' },
    { top: '35%', left: '92%', size: 8, delay: 1.8, type: 'metallic' },
    { top: '55%', left: '12%', size: 5, delay: 0.2, type: 'metallic' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const leftBox = leftBoxRef.current;
    const rightBox = rightBoxRef.current;
    const dotsContainer = dotsContainerRef.current;

    if (!section || !leftBox || !rightBox || !dotsContainer) return;

    // Create a timeline with ScrollTrigger - no pin, normal flow
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom", // Start when section enters viewport
        end: "bottom top", // End when section leaves viewport
        scrub: 2, // Higher scrub for slower, smoother animation
        markers: false,
      },
    });

    // Boxes come from opposite sides and cross each other (swap positions)
    tl.fromTo(
      leftBox,
      {
        x: "-100vw",
        rotation: 0,
      },
      {
        x: "100vw", // Goes all the way to the right
        rotation: 360,
        ease: "power1.inOut",
        duration: 3, // Longer duration for slower roll
      },
      0
    )
      .fromTo(
        rightBox,
        {
          x: "100vw",
          rotation: 0,
        },
        {
          x: "-100vw", // Goes all the way to the left
          rotation: -360,
          ease: "power1.inOut",
          duration: 3, // Longer duration for slower roll
        },
        0
      );

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
      className="h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden bg-background mb-28"
      style={{ marginTop: '-2cm', marginBottom: '3cm' }}
    >
      {/* Background metallic dots with some orange */}
      <div ref={dotsContainerRef} className="absolute inset-0">
        {dots.map((dot, index) => (
          <div
            key={index}
            className="bg-dot absolute rounded-full animate-pulse"
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
      </div>

      <div className="relative w-full h-full flex items-center justify-center z-10">
        {/* Left Box - Image */}
        <div
          ref={leftBoxRef}
          className="absolute w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-3xl flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${leftImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow:
              "0 0 40px rgba(255, 140, 0, 0.6), 0 0 80px rgba(255, 140, 0, 0.4)",
          }}
        >
          <span className="text-white font-bold text-2xl md:text-4xl lg:text-5xl uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] relative z-10">
            Create
          </span>
        </div>

        {/* Right Box - Image */}
        <div
          ref={rightBoxRef}
          className="absolute w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-3xl flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${rightImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow:
              "0 0 40px rgba(255, 140, 0, 0.6), 0 0 80px rgba(255, 140, 0, 0.4)",
          }}
        >
          <span className="text-white font-bold text-2xl md:text-4xl lg:text-5xl uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] relative z-10">
            Design
          </span>
        </div>

      </div>
    </section>
  );
};

export default CollisionSection;
