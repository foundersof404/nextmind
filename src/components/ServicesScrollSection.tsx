import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    
    if (!section || !text) return;

    // Split text into characters
    const textContent = text.textContent || "";
    text.textContent = "";
    
    const chars = textContent.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      text.appendChild(span);
      return span;
    });

    // Create horizontal scroll animation
    const scrollTween = gsap.to(text, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=5000px",
        scrub: true,
      },
    });

    // Animate each character from random positions
    chars.forEach((char) => {
      gsap.from(char, {
        yPercent: gsap.utils.random(-200, 200),
        rotation: gsap.utils.random(-20, 20),
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollTween,
          start: "left 100%",
          end: "left 30%",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section || trigger.vars.containerAnimation === scrollTween) {
          trigger.kill();
        }
      });
      scrollTween.kill();
    };
  }, []);

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
      className="h-screen flex items-center overflow-hidden bg-background relative"
    >
      {/* Metallic 3D dots */}
      {dots.map((dot, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) dotsRef.current[index] = el;
          }}
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

      <div className="container relative z-10">
        <h3 
          ref={textRef}
          className="font-hero text-5xl md:text-7xl lg:text-[clamp(2rem,10vw,12rem)] font-bold uppercase leading-[1.1] text-hero whitespace-nowrap pl-[100vw]"
          style={{
            display: 'flex',
            width: 'max-content',
            gap: '4vw',
          }}
        >
          AI, Websites, Web Design, AI Automation, ChatBot, Mobile Application, ...And much more!
        </h3>
      </div>
    </section>
  );
};

export default ServicesScrollSection;
