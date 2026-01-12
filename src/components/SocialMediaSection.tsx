import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import linkedinIcon from "@/assets/linkedin.webp";
import tiktokIcon from "@/assets/tiktok.webp";
import instagramIcon from "@/assets/instagram.webp";

gsap.registerPlugin(ScrollTrigger);

const SocialMediaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const iconsRef = useRef<HTMLAnchorElement[]>([]);
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: linkedinIcon,
      url: "#",
    },
    {
      name: "TikTok",
      icon: tiktokIcon,
      url: "#",
    },
    {
      name: "Instagram",
      icon: instagramIcon,
      url: "#",
    },
  ];

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

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    // Animate heading on scroll
    gsap.from(heading, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    });

    // Stagger animation for social icons
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        gsap.from(icon, {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        });
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

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pb-0 bg-background relative overflow-hidden"
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
      <h2 
        ref={headingRef}
        className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-center mb-8 md:mb-24 text-foreground relative z-10"
      >
        Find Us On Our Socials
      </h2>
      
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-20 lg:gap-32 relative z-10">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            ref={(el) => {
              if (el) iconsRef.current[index] = el;
            }}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <img
              src={social.icon}
              alt={social.name}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-12"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialMediaSection;
