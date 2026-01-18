import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CollisionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const leftFragmentsRef = useRef<HTMLDivElement>(null);
  const rightFragmentsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);

  // Image URLs from Unsplash
  const leftImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop"; // Abstract colorful
  const rightImage = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=800&fit=crop"; // Tech/gradient

  // Metallic 3D dots for background
  const dots = [
    { top: '15%', left: '10%', size: 8, delay: 0 },
    { top: '25%', left: '85%', size: 6, delay: 0.5 },
    { top: '70%', left: '15%', size: 10, delay: 1 },
    { top: '80%', left: '80%', size: 5, delay: 1.5 },
    { top: '40%', left: '8%', size: 7, delay: 0.3 },
    { top: '60%', left: '90%', size: 9, delay: 0.8 },
    { top: '10%', left: '60%', size: 4, delay: 1.2 },
    { top: '85%', left: '40%', size: 6, delay: 0.6 },
    { top: '35%', left: '92%', size: 8, delay: 1.8 },
    { top: '55%', left: '12%', size: 5, delay: 0.2 },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const leftBox = leftBoxRef.current;
    const rightBox = rightBoxRef.current;
    const leftFragments = leftFragmentsRef.current;
    const rightFragments = rightFragmentsRef.current;
    const text = textRef.current;
    const dotsContainer = dotsContainerRef.current;

    if (!section || !leftBox || !rightBox || !leftFragments || !rightFragments || !text || !dotsContainer) return;

    const leftPieces = leftFragments.querySelectorAll(".fragment");
    const rightPieces = rightFragments.querySelectorAll(".fragment");
    const backgroundDots = dotsContainer.querySelectorAll(".bg-dot");

    // Create a timeline with ScrollTrigger (slower animation)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3000", // Extended scroll distance to keep section pinned
        scrub: 2, // Higher scrub value for smoother, slower animation
        pin: true, // Pin the section while animation plays
        markers: false,
      },
    });

    // Animate boxes from opposite sides to center (slower)
    tl.fromTo(
      leftBox,
      {
        x: "-100vw",
        rotation: 0,
      },
      {
        x: "-15vw",
        rotation: 180,
        ease: "power1.inOut",
        duration: 1.5,
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
          x: "15vw",
          rotation: -180,
          ease: "power1.inOut",
          duration: 1.5,
        },
        0
      )
      // Fade out background dots at collision moment
      .to(
        backgroundDots,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "collision"
      )
      // Hide main boxes and show fragments
      .to(
        [leftBox, rightBox],
        {
          opacity: 0,
          duration: 0.1,
        },
        "collision"
      )
      .to(
        [leftFragments, rightFragments],
        {
          opacity: 1,
          duration: 0.05,
        },
        "collision"
      )
      // Animate left fragments scattering
      .to(
        leftPieces,
        {
          x: (i) => gsap.utils.random(-300, -100),
          y: (i) => gsap.utils.random(-300, 300),
          rotation: (i) => gsap.utils.random(-180, 180),
          opacity: 0.4, // Keep fragments visible
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.02,
        },
        "collision"
      )
      // Animate right fragments scattering
      .to(
        rightPieces,
        {
          x: (i) => gsap.utils.random(100, 300),
          y: (i) => gsap.utils.random(-300, 300),
          rotation: (i) => gsap.utils.random(-180, 180),
          opacity: 0.4, // Keep fragments visible
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.02,
        },
        "collision"
      )
      // Show final text
      .fromTo(
        text,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "collision+=0.3"
      )
      // Keep text visible for a moment before unpinning
      .to(text, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
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
      className="h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden bg-background -mt-[800px] md:-mt-[900px] lg:-mt-[1000px]"
    >
      {/* Background metallic dots */}
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
              "0 0 40px rgba(147, 51, 234, 0.6), 0 0 80px rgba(147, 51, 234, 0.4)",
          }}
        >
          <span className="text-white font-bold text-2xl md:text-4xl lg:text-5xl uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] relative z-10">
            Design
          </span>
        </div>

        {/* Left Box Fragments - Image pieces */}
        <div
          ref={leftFragmentsRef}
          className="absolute opacity-0"
          style={{ left: "35%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          {[...Array(16)].map((_, i) => {
            const size = gsap.utils.random(40, 100);
            const bgX = gsap.utils.random(0, 100);
            const bgY = gsap.utils.random(0, 100);
            return (
              <div
                key={i}
                className="fragment absolute rounded-lg overflow-hidden"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundImage: `url(${leftImage})`,
                  backgroundSize: "400%",
                  backgroundPosition: `${bgX}% ${bgY}%`,
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                  left: `${gsap.utils.random(-50, 50)}px`,
                  top: `${gsap.utils.random(-50, 50)}px`,
                }}
              />
            );
          })}
        </div>

        {/* Right Box Fragments - Image pieces */}
        <div
          ref={rightFragmentsRef}
          className="absolute opacity-0"
          style={{ left: "65%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          {[...Array(16)].map((_, i) => {
            const size = gsap.utils.random(40, 100);
            const bgX = gsap.utils.random(0, 100);
            const bgY = gsap.utils.random(0, 100);
            return (
              <div
                key={i}
                className="fragment absolute rounded-lg overflow-hidden"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundImage: `url(${rightImage})`,
                  backgroundSize: "400%",
                  backgroundPosition: `${bgX}% ${bgY}%`,
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                  left: `${gsap.utils.random(-50, 50)}px`,
                  top: `${gsap.utils.random(-50, 50)}px`,
                }}
              />
            );
          })}
        </div>

        {/* Text that appears after collision */}
        <div
          ref={textRef}
          className="absolute opacity-0"
        >
          <h2 className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-center bg-gradient-to-r from-[#FF8C00] via-[#9333EA] to-[#FF8C00] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
            Innovation
            <br />
            Unleashed
          </h2>
        </div>
      </div>
    </section>
  );
};

export default CollisionSection;
