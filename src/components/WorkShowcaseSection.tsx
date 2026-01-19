import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Manchester United X Marriott",
    description: "Connecting fans with their player's stories",
    tags: ["DESIGN", "DEVELOPMENT", "3D"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=700&fit=crop",
  },
  {
    title: "Nova AI Platform",
    description: "Next-gen artificial intelligence dashboard",
    tags: ["AI", "DEVELOPMENT", "UI/UX"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=700&fit=crop",
  },
  {
    title: "Rawan Creates",
    description: "Branding & Social Media Specialist",
    tags: ["BRANDING", "SOCIAL MEDIA", "DESIGN"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=700&fit=crop",
  },
  {
    title: "RetailPro POS",
    description: "Modern point of sale system redesign",
    tags: ["DESIGN", "POS", "MOBILE"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=700&fit=crop",
  },
];

const WorkShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const slides = slidesRef.current.filter(Boolean);
    if (slides.length === 0) return;

    // Set initial state - first slide visible, others below
    slides.forEach((slide, index) => {
      gsap.set(slide, {
        y: index === 0 ? 0 : "100%",
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 0.8,
        rotationX: index === 0 ? 0 : 15,
      });
    });

    // Create timeline for automatic slide transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${projects.length * 1500}`, // Each project gets scroll space
        scrub: 2,
        pin: true,
        markers: false,
      },
    });

    // Animate each slide transition - slide up from bottom with morph effect
    slides.forEach((slide, index) => {
      if (index < slides.length - 1) {
        const nextSlide = slides[index + 1];
        
        // Morph current slide: slide up, scale down, rotate
        tl.to(
          slide,
          {
            y: "-100%",
            opacity: 0,
            scale: 0.8,
            rotationX: -15,
            duration: 1.2,
            ease: "power2.inOut",
          },
          index + 0.5
        );

        // Morph next slide: slide up from bottom, scale up, rotate to normal
        tl.fromTo(
          nextSlide,
          {
            y: "100%",
            opacity: 0,
            scale: 0.8,
            rotationX: 15,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          index + 0.5
        );
      }
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
    { top: '10%', left: '5%', size: 6, delay: 0, type: 'metallic' },
    { top: '20%', left: '90%', size: 8, delay: 0.5, type: 'orange' },
    { top: '80%', left: '10%', size: 5, delay: 1, type: 'metallic' },
    { top: '85%', left: '85%', size: 7, delay: 1.5, type: 'orange' },
    { top: '15%', left: '25%', size: 7, delay: 0.3, type: 'metallic' },
    { top: '30%', left: '75%', size: 9, delay: 0.8, type: 'metallic' },
    { top: '45%', left: '15%', size: 6, delay: 1.2, type: 'orange' },
    { top: '55%', left: '92%', size: 8, delay: 0.6, type: 'metallic' },
    { top: '65%', left: '40%', size: 5, delay: 1.8, type: 'metallic' },
    { top: '75%', left: '60%', size: 10, delay: 0.2, type: 'orange' },
    { top: '5%', left: '50%', size: 4, delay: 0.9, type: 'metallic' },
    { top: '25%', left: '8%', size: 7, delay: 1.3, type: 'metallic' },
    { top: '40%', left: '95%', size: 6, delay: 0.7, type: 'metallic' },
    { top: '60%', left: '70%', size: 8, delay: 1.6, type: 'orange' },
    { top: '90%', left: '50%', size: 9, delay: 0.4, type: 'metallic' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Metallic dots with some orange */}
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
            zIndex: 0,
          }}
        />
      ))}

      {/* Project Slides */}
      {projects.map((project, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) slidesRef.current[index] = el;
          }}
          className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-24"
          style={{ zIndex: 10 }}
        >
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <div className="font-hero text-sm uppercase tracking-widest text-foreground/40 mb-2">
                {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </div>
              <h2 className="font-hero text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-foreground mb-4 leading-tight">
                {project.title}
              </h2>
              <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs md:text-sm px-4 py-2 border border-foreground/30 text-foreground/70 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image with white border */}
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default WorkShowcaseSection;
