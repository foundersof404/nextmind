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

  useEffect(() => {
    const container = containerRef.current;
    const imageTrack = imageTrackRef.current;

    if (!container || !imageTrack) return;

    // Calculate the scroll distance to show each image with its corresponding text
    // We need to scroll (n-1) full screens to show all n images
    const totalScroll = (projects.length - 1) * 100;
    
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section className="relative bg-background">
      <div 
        ref={containerRef}
        className="relative"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.65fr 1fr',
        }}
      >
        {/* Scrolling Content */}
        <div className="relative z-10">
          {projects.map((project, index) => (
            <article
              key={index}
              className="min-h-[60vh] flex items-center px-8 md:px-16 py-12"
              style={{
                scrollSnapAlign: 'center',
              }}
            >
              <div>
                <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-foreground mb-4 leading-tight">
                  {project.title}
                </h2>
                <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs md:text-sm px-3 py-1 border border-foreground/30 text-foreground/70 uppercase tracking-wider"
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
          {/* Frame Container with Border */}
          <div
            className="relative overflow-hidden"
            style={{
              width: 'calc(100% - 12vh)',
              height: 'calc(100vh - 12vh)',
              borderRadius: '24px',
            }}
          >
            {/* Frame Border */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                border: '6vh solid',
                borderColor: 'var(--background)',
                borderRadius: '24px',
                boxShadow: '0 0 24px 0px rgba(0, 0, 0, 0.3) inset',
              }}
            />

            {/* Image Track - Scrolling Container */}
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
    </section>
  );
};

export default WorkShowcaseSection;
