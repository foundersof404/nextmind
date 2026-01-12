import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/assets/NextMindLogo.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    const contact = contactRef.current;
    const email = emailRef.current;
    const phone = phoneRef.current;
    const year = yearRef.current;

    if (!footer) return;

    // Animate logo
    if (logo) {
      gsap.from(logo, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
      });
    }

    // Animate contact section
    if (contact) {
      gsap.from(contact, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
      });
    }

    // Stagger animation for contact items
    if (email) {
      gsap.from(email, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
      });
    }

    if (phone) {
      gsap.from(phone, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
      });
    }

    // Animate year
    if (year) {
      gsap.from(year, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footer) {
          trigger.kill();
        }
      });
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const dots = [
    { top: '10%', left: '5%', size: 6, delay: 0 },
    { top: '20%', left: '90%', size: 8, delay: 0.5 },
    { top: '80%', left: '10%', size: 5, delay: 1 },
    { top: '85%', left: '85%', size: 7, delay: 1.5 },
    { top: '50%', left: '3%', size: 4, delay: 0.3 },
    { top: '60%', left: '95%', size: 6, delay: 0.8 },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative min-h-[50vh] flex flex-col items-center justify-center px-6 md:px-12 py-8 md:py-16 bg-background overflow-hidden border-t border-border/30"
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

      {/* Logo */}
      <div className="relative z-10 mb-6 md:mb-12">
        <img
          ref={logoRef}
          src={Logo}
          alt="Next Mind"
          className="h-12 md:h-16 lg:h-20 w-auto object-contain"
        />
      </div>

      {/* Contact Us Section */}
      <div ref={contactRef} className="relative z-10 text-center mb-6 md:mb-12">
        <h3 className="font-hero text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-foreground mb-8 tracking-tight">
          Contact Us
        </h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Email */}
          <a
            ref={emailRef}
            href="mailto:nextmind.wiz@gmail.com"
            className="group flex items-center gap-3 text-foreground/80 hover:text-foreground transition-all duration-300"
          >
            <span className="font-serif text-lg md:text-xl">Email:</span>
            <span className="font-hero text-base md:text-lg uppercase tracking-wide border-b border-transparent group-hover:border-foreground/50 transition-all duration-300">
              nextmind.wiz@gmail.com
            </span>
          </a>

          {/* Phone */}
          <a
            ref={phoneRef}
            href="tel:+1234567890"
            className="group flex items-center gap-3 text-foreground/80 hover:text-foreground transition-all duration-300"
          >
            <span className="font-serif text-lg md:text-xl">Phone:</span>
            <span className="font-hero text-base md:text-lg uppercase tracking-wide border-b border-transparent group-hover:border-foreground/50 transition-all duration-300">
              +1 (234) 567-890
            </span>
          </a>
        </div>
      </div>

      {/* Year */}
      <div ref={yearRef} className="relative z-10">
        <p className="font-hero text-sm md:text-base uppercase tracking-widest text-foreground/50">
          © {currentYear} Next Mind Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
