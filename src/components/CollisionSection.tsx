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

  useEffect(() => {
    const section = sectionRef.current;
    const leftBox = leftBoxRef.current;
    const rightBox = rightBoxRef.current;
    const leftFragments = leftFragmentsRef.current;
    const rightFragments = rightFragmentsRef.current;
    const text = textRef.current;

    if (!section || !leftBox || !rightBox || !leftFragments || !rightFragments || !text) return;

    const leftPieces = leftFragments.querySelectorAll(".fragment");
    const rightPieces = rightFragments.querySelectorAll(".fragment");

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
          opacity: 0,
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
          opacity: 0,
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
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Box - Orange */}
        <div
          ref={leftBoxRef}
          className="absolute w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-3xl flex items-center justify-center"
          style={{
            background: "#FF8C00",
            boxShadow:
              "0 0 40px rgba(255, 140, 0, 0.6), 0 0 80px rgba(255, 140, 0, 0.4)",
          }}
        >
          <span className="text-white font-bold text-2xl md:text-4xl lg:text-5xl uppercase tracking-wider">
            Create
          </span>
        </div>

        {/* Right Box - Purple */}
        <div
          ref={rightBoxRef}
          className="absolute w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-3xl flex items-center justify-center"
          style={{
            background: "#9333EA",
            boxShadow:
              "0 0 40px rgba(147, 51, 234, 0.6), 0 0 80px rgba(147, 51, 234, 0.4)",
          }}
        >
          <span className="text-white font-bold text-2xl md:text-4xl lg:text-5xl uppercase tracking-wider">
            Design
          </span>
        </div>

        {/* Left Box Fragments - Orange pieces */}
        <div
          ref={leftFragmentsRef}
          className="absolute opacity-0"
          style={{ left: "35%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="fragment absolute rounded-lg"
              style={{
                width: `${gsap.utils.random(30, 80)}px`,
                height: `${gsap.utils.random(30, 80)}px`,
                background: "#FF8C00",
                boxShadow: "0 0 20px rgba(255, 140, 0, 0.5)",
                left: `${gsap.utils.random(-50, 50)}px`,
                top: `${gsap.utils.random(-50, 50)}px`,
              }}
            />
          ))}
        </div>

        {/* Right Box Fragments - Purple pieces */}
        <div
          ref={rightFragmentsRef}
          className="absolute opacity-0"
          style={{ left: "65%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="fragment absolute rounded-lg"
              style={{
                width: `${gsap.utils.random(30, 80)}px`,
                height: `${gsap.utils.random(30, 80)}px`,
                background: "#9333EA",
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
                left: `${gsap.utils.random(-50, 50)}px`,
                top: `${gsap.utils.random(-50, 50)}px`,
              }}
            />
          ))}
        </div>

        {/* Text that appears after collision */}
        <div
          ref={textRef}
          className="absolute opacity-0"
        >
          <h2 className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-center bg-gradient-to-r from-[#FF8C00] via-[#9333EA] to-[#FF8C00] bg-clip-text text-transparent">
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
