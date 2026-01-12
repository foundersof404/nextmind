import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  const stats = [
    { value: 2, label: "Years of Experience", prefix: "+" },
    { value: 50, label: "Project Completed", prefix: "+" },
    { value: 50, label: "Happy Customers", prefix: "+" },
  ];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    // Animate each stat counter
    statsRef.current.forEach((statElement, index) => {
      if (!statElement) return;

      const stat = stats[index];
      const numberElement = statElement.querySelector(".stat-number");
      const labelElement = statElement.querySelector(".stat-label");

      if (!numberElement || !labelElement) return;

      // Animate the container
      gsap.from(statElement, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Animate counter from 0 to target value (slower)
      const counter = { value: 0 };
      gsap.to(counter, {
        value: stat.value,
        duration: 4,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        onUpdate: () => {
          if (numberElement) {
            numberElement.textContent = `${stat.prefix}${Math.round(counter.value)}`;
          }
        },
      });

      // Animate label
      gsap.from(labelElement, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: index * 0.2 + 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
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
  ];

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center px-6 md:px-12 py-6 md:py-12 bg-background relative overflow-hidden"
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

      <div className="flex flex-row md:flex-row items-center justify-center gap-3 md:gap-12 lg:gap-16 relative z-10 w-full max-w-7xl">
        {stats.map((stat, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) statsRef.current[index] = el;
            }}
            className="text-center flex-1"
          >
            <div
              className="stat-number font-hero text-3xl md:text-7xl lg:text-8xl font-bold text-foreground mb-2 md:mb-4"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
              }}
            >
              {stat.prefix}0
            </div>
            <div className="stat-label font-serif text-xs md:text-xl lg:text-2xl text-foreground/80 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
