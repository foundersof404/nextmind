import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Manchester United X Marriott",
    description: "Connecting fans with their player's stories",
    tags: ["DESIGN", "DEVELOPMENT", "3D"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
  },
  {
    title: "Nova AI Platform",
    description: "Next-gen artificial intelligence dashboard",
    tags: ["AI", "DEVELOPMENT", "UI/UX"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
  },
  {
    title: "Rawan Creates",
    description: "Branding & Social Media Specialist",
    tags: ["BRANDING", "SOCIAL MEDIA", "DESIGN"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
  },
  {
    title: "RetailPro POS",
    description: "Modern point of sale system redesign",
    tags: ["DESIGN", "POS", "MOBILE"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  },
];

const WorkShowcaseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const textItemsRef = useRef<HTMLElement[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const imageTrack = imageTrackRef.current;
    const mobileContainer = mobileContainerRef.current;

    if (!container || !imageTrack) return;

    // Desktop: Scroll-triggered image animation
    if (window.innerWidth >= 768) {
      gsap.to(imageTrack, {
        y: () => -(imageTrack.scrollHeight - window.innerHeight),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Animate text items on scroll
      textItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          });
        }
      });

      // Animate images with scale effect
      imagesRef.current.forEach((img, index) => {
        if (img) {
          gsap.from(img, {
            opacity: 0,
            scale: 0.8,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          });
        }
      });
    } else if (mobileContainer) {
      // Mobile: Card overlay animation with alternating directions
      const cards = mobileCardsRef.current.filter(Boolean);
      
      if (cards.length === 0) return;
      
      const viewportWidth = window.innerWidth;
      
      // Set initial positions
      cards.forEach((card, index) => {
        if (card) {
          if (index === 0) {
            // First card is visible from the start
            gsap.set(card, {
              x: 0,
              zIndex: 1,
            });
          } else {
            // Card 2, 4 come from right; Card 3 comes from left
            const comesFromRight = index % 2 === 1;
            const startX = comesFromRight ? viewportWidth : -viewportWidth;
            
            gsap.set(card, {
              x: startX,
              zIndex: index + 1,
            });
          }
        }
      });

      // Create scroll timeline - pin the container
      const scrollDistance = (projects.length - 1) * window.innerHeight; // Each overlay gets 1 viewport height
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileContainer,
          start: "top top",
          end: `+=${scrollDistance}px`,
          scrub: 1,
          pin: true,
        },
      });

      // Animate each card sliding in with alternating directions
      cards.forEach((card, index) => {
        if (card && index > 0) {
          const comesFromRight = index % 2 === 1; // Card 2, 4 from right; Card 3 from left
          const startProgress = (index - 1) / (projects.length - 1);
          const offset = index * 30; // Offset to show previous cards (30px per card)
          
          // Slide to final position
          tl.to(
            card,
            {
              x: offset,
              duration: 1,
              ease: "power2.out",
            },
            startProgress
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container || trigger.vars.trigger === mobileContainer) {
          trigger.kill();
        }
      });
    };
  }, []);

  const dots = [
    { top: '10%', left: '5%', size: 6, delay: 0 },
    { top: '20%', left: '90%', size: 8, delay: 0.5 },
    { top: '80%', left: '10%', size: 5, delay: 1 },
    { top: '85%', left: '85%', size: 7, delay: 1.5 },
  ];

  return (
    <section className="relative bg-background">
      {/* Metallic dots for desktop */}
      <div className="hidden md:block">
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
              zIndex: 0,
            }}
          />
        ))}
      </div>

      {/* Desktop Layout */}
      <div 
        ref={containerRef}
        className="hidden md:grid relative"
        style={{
          gridTemplateColumns: '0.65fr 1fr',
        }}
      >
        {/* Scrolling Content */}
        <div className="relative z-10">
          {projects.map((project, index) => (
            <article
              key={index}
              ref={(el) => {
                if (el) textItemsRef.current[index] = el as HTMLElement;
              }}
              className="min-h-[60vh] flex items-center px-8 md:px-16 py-12"
            >
              <div>
                {/* Project Number */}
                <div className="font-hero text-sm uppercase tracking-widest text-foreground/40 mb-2">
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </div>
                <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-foreground mb-4 leading-tight">
                  {project.title}
                </h2>
                <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs md:text-sm px-4 py-2 border border-foreground/30 text-foreground/70 uppercase tracking-wider hover:border-foreground/50 hover:text-foreground transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sticky Image Frame */}
        <div
          className="sticky top-0 h-screen flex items-center justify-center"
          style={{
            gridColumn: 2,
            gridRow: '1 / -1',
            zIndex: 1,
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: 'calc(100% - 12vh)',
              height: 'calc(100vh - 12vh)',
              borderRadius: '24px',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                border: '6vh solid',
                borderColor: 'var(--background)',
                borderRadius: '24px',
                boxShadow: '0 0 24px 0px rgba(0, 0, 0, 0.3) inset',
              }}
            />
            <div
              ref={imageTrackRef}
              className="absolute inset-0"
              style={{
                padding: '6vh',
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center"
                  style={{
                    height: '60vh',
                    marginTop: index === 0 ? 'calc((100vh - 60vh) / 2)' : '0',
                  }}
                >
                  <img
                    ref={(el) => {
                      if (el) imagesRef.current[index] = el;
                    }}
                    src={project.image}
                    alt={project.title}
                    className="max-h-full max-w-[80%] object-contain"
                    style={{
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4))',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Overlay Cards */}
      <div ref={mobileContainerRef} className="md:hidden relative overflow-hidden" style={{ minHeight: '100vh' }}>
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) mobileCardsRef.current[index] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 bg-background"
            style={{
              zIndex: index + 1,
            }}
          >
            {/* Project Number */}
            <div className="font-hero text-xs uppercase tracking-widest text-foreground/40 mb-4 relative z-10">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>

            {/* Card Container */}
            <div className="w-full relative flex-1 flex flex-col justify-center">
              {/* Image */}
              <div className="w-full mb-6 relative">
                <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4))',
                    }}
                  />
                  <div className="absolute inset-0 border-2 border-foreground/10 rounded-lg pointer-events-none" />
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center px-4 relative z-10">
                <h2 className="font-hero text-2xl font-bold uppercase text-foreground mb-3 leading-tight">
                  {project.title}
                </h2>
                <p className="text-base text-foreground/80 font-light leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 border border-foreground/30 text-foreground/70 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Shadow effect for depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: index > 0 ? '-4px 0 20px rgba(0, 0, 0, 0.3)' : 'none',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkShowcaseSection;
