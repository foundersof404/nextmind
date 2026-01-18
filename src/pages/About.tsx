import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Visionary leader with 15+ years in tech innovation",
  },
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Award-winning designer crafting memorable experiences",
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Full-stack expert building scalable solutions",
  },
  {
    name: "Emily Zhang",
    role: "AI Specialist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Machine learning pioneer transforming businesses",
  },
];

const values = [
  {
    title: "Innovation First",
    description: "We push boundaries and embrace cutting-edge technologies to deliver solutions that set new standards.",
    icon: "💡",
  },
  {
    title: "Client Success",
    description: "Your success is our mission. We're committed to delivering results that exceed expectations.",
    icon: "🎯",
  },
  {
    title: "Quality Driven",
    description: "Excellence in every line of code, every pixel, and every interaction. No compromises.",
    icon: "⚡",
  },
  {
    title: "Collaborative Spirit",
    description: "We believe in the power of partnership, working closely with clients to achieve shared goals.",
    icon: "🤝",
  },
];

const stats = [
  { number: "150+", label: "Projects Delivered" },
  { number: "50+", label: "Happy Clients" },
  { number: "15+", label: "Industry Awards" },
  { number: "8", label: "Years of Excellence" },
];

const About = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroText = heroTextRef.current;
    const heroSection = heroSectionRef.current;
    const story = storyRef.current;
    const teamGrid = teamGridRef.current;
    const values = valuesRef.current;

    if (!heroText || !heroSection) return;

    const textContent = heroText.textContent || "";
    heroText.textContent = "";
    
    const chars = textContent.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      heroText.appendChild(span);
      return span;
    });

    gsap.set(chars, { opacity: 1, y: 0 });

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    heroTl.to(chars, {
      opacity: 0,
      scale: 2,
      y: -100,
      rotation: gsap.utils.wrap([-45, 45]),
      stagger: {
        each: 0.02,
        from: "random",
      },
      duration: 1,
      ease: "power2.in",
    });

    if (story) {
      const storyElements = story.querySelectorAll('.story-element');
      storyElements.forEach((element, index) => {
        gsap.from(element, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
          },
          delay: index * 0.1,
        });
      });
    }

    if (teamGrid) {
      const teamCards = teamGrid.querySelectorAll('.team-card');
      teamCards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          rotation: gsap.utils.random(-5, 5),
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          delay: index * 0.15,
        });
      });
    }

    if (values) {
      const valueTapes = values.querySelectorAll('.value-tape');
      valueTapes.forEach((tape, index) => {
        gsap.set(tape, { 
          scaleX: 0,
          opacity: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: tape,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            once: false,
          },
        });

        tl.to(tape, {
          scaleX: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const metallicDots = [
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
    { top: '20%', left: '50%', size: 7, delay: 0.9 },
    { top: '65%', left: '70%', size: 9, delay: 1.3 },
    { top: '45%', left: '25%', size: 6, delay: 0.7 },
    { top: '90%', left: '60%', size: 8, delay: 1.6 },
    { top: '5%', left: '35%', size: 5, delay: 0.4 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <section
          ref={heroSectionRef}
          className="h-screen flex items-center justify-center relative overflow-hidden bg-background"
        >
          {metallicDots.map((dot, index) => (
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

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4" style={{ zIndex: 50 }}>
            <h1
              ref={heroTextRef}
              className="font-hero text-[20vw] md:text-[18vw] lg:text-[16vw] font-bold uppercase leading-[0.85] tracking-tight text-center"
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                mixBlendMode: 'difference',
              }}
            >
              ABOUT US
            </h1>
          </div>
        </section>

        <section
          ref={storyRef}
          className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20"
        >
          <div className="max-w-5xl mx-auto">
            <div className="story-element mb-16">
              <h2 className="font-hero text-5xl md:text-7xl font-bold uppercase mb-8">
                Our Story
              </h2>
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-6">
                Founded in 2016, NextMind emerged from a simple belief: technology should empower, not complicate. What started as a small team of passionate developers has grown into a full-service digital agency trusted by brands worldwide.
              </p>
            </div>

            <div className="story-element mb-16">
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-6">
                We've spent years perfecting our craft, building everything from simple websites to complex AI-powered platforms. Each project teaches us something new, and we bring that knowledge to every client we serve.
              </p>
            </div>

            <div className="story-element grid md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 border border-foreground/20 hover:border-foreground/40 transition-all duration-300 bg-background"
                >
                  <div className="font-hero text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="story-element">
              <h3 className="font-hero text-3xl md:text-4xl font-bold uppercase mb-6">
                Our Mission
              </h3>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                To bridge the gap between imagination and reality through innovative digital solutions. We're not just building products—we're crafting experiences that transform businesses and delight users.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={valuesRef}
          className="relative bg-background py-20 overflow-hidden"
          style={{ minHeight: '200vh' }}
        >
          <div className="text-center mb-32 pt-10">
            <h2 className="font-hero text-5xl md:text-7xl font-bold uppercase text-foreground">
              Our Values
            </h2>
          </div>
          
          <div className="relative w-full overflow-hidden" style={{ height: '150vh' }}>
            {values.map((value, index) => {
              const angles = [10, -10, 10, -10];
              const topPositions = [15, 35, 55, 75];
              
              // Shortened mobile descriptions
              const mobileDescriptions = [
                "Pushing boundaries with cutting-edge tech to set new standards.",
                "Your success is our mission. Results that exceed expectations.",
                "Excellence in every line of code, pixel, and interaction.",
                "We believe in partnership, working closely to achieve goals.",
              ];
              
              return (
                <div
                  key={index}
                  className="value-tape absolute bg-white flex items-center justify-center px-4 md:px-8"
                  style={{
                    height: '3cm',
                    width: '120%',
                    left: '-10%',
                    transform: `rotate(${angles[index]}deg)`,
                    top: `${topPositions[index]}%`,
                    transformOrigin: 'center',
                  }}
                >
                  {/* Mobile text - shorter */}
                  <p className="md:hidden font-hero text-[10px] sm:text-xs uppercase tracking-wide text-black text-center leading-tight px-2">
                    {mobileDescriptions[index]}
                  </p>
                  
                  {/* Desktop text - full description */}
                  <p className="hidden md:block font-hero text-base lg:text-xl uppercase tracking-wider text-black text-center leading-tight">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden bg-gradient-to-b from-background to-background/50">
          {metallicDots.map((dot, index) => (
            <div
              key={`work-${index}`}
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
          <div className="text-center relative z-10 max-w-5xl">
            <div className="mb-12">
              <h2 className="font-hero text-5xl md:text-7xl lg:text-8xl font-bold uppercase mb-6 leading-tight tracking-tight">
                Let's Work
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground">
                  Together
                </span>
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/80 mb-16 max-w-3xl mx-auto leading-relaxed">
              Ready to start your next project? We'd love to hear from you and discuss how we can help bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/contact"
                className="group relative inline-block px-12 py-5 bg-foreground text-background font-hero uppercase tracking-wider text-base transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-foreground/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
              
              <div className="flex gap-4">
                <a
                  href="mailto:hello@nextmind.com"
                  className="w-12 h-12 border-2 border-foreground/30 hover:border-foreground flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-foreground/30 hover:border-foreground flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
