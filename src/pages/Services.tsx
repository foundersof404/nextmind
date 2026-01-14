import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "AI Solutions",
    description: "Custom AI integration and automation to transform your business operations",
    features: ["Machine Learning", "Natural Language Processing", "Predictive Analytics", "AI Chatbots"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
  },
  {
    id: "02",
    title: "Web Development",
    description: "Modern, responsive websites built with cutting-edge technologies",
    features: ["React & Next.js", "Custom CMS", "E-commerce", "Progressive Web Apps"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: "03",
    title: "Web Design",
    description: "Beautiful, user-centric designs that captivate and convert",
    features: ["UI/UX Design", "Brand Identity", "Prototyping", "Design Systems"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
  },
  {
    id: "04",
    title: "AI Automation",
    description: "Streamline workflows with intelligent automation solutions",
    features: ["Process Automation", "Data Processing", "API Integration", "Workflow Optimization"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
  },
  {
    id: "05",
    title: "ChatBot Development",
    description: "Intelligent conversational AI for customer engagement",
    features: ["24/7 Support", "Multi-platform", "Natural Conversations", "Analytics Dashboard"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
  },
  {
    id: "06",
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps that users love",
    features: ["iOS & Android", "React Native", "App Store Optimization", "Push Notifications"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
  },
];

const Services = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroText2Ref = useRef<HTMLHeadingElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaTextRef = useRef<HTMLHeadingElement>(null);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const heroText = heroTextRef.current;
    const heroText2 = heroText2Ref.current;
    const heroSection = heroSectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const ctaSection = ctaSectionRef.current;
    const ctaText = ctaTextRef.current;

    if (!heroText || !heroText2 || !heroSection || !cardsContainer) return;

    // Split first line into characters
    const textContent1 = heroText.textContent || "";
    heroText.textContent = "";
    
    const chars1 = textContent1.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      heroText.appendChild(span);
      return span;
    });

    // Split second line into characters
    const textContent2 = heroText2.textContent || "";
    heroText2.textContent = "";
    
    const chars2 = textContent2.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.whiteSpace = char === " " ? "pre" : "normal";
      heroText2.appendChild(span);
      return span;
    });

    // Set initial state - visible on load
    gsap.set([chars1, chars2], {
      opacity: 1,
      y: 0,
    });

    // Create timeline for hero animation
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    // Animate characters with scale and rotation
    heroTl.to([...chars1, ...chars2], {
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
    }, 0);

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.set(card, {
        zIndex: services.length - index,
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 0.8,
      });
    });

    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: cardsContainer,
        start: "top top",
        end: () => `+=${services.length * window.innerHeight}`,
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const cardIndex = Math.floor(progress * services.length);
          setCurrentCard(Math.min(cardIndex, services.length - 1));
        },
      },
    });

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      if (index > 0) {
        const startProgress = (index - 0.5) / services.length;
        const endProgress = index / services.length;

        cardsTl.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.8,
            yPercent: 10,
          },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            ease: "power2.out",
          },
          startProgress
        );
      }

      if (index < services.length - 1) {
        const exitStart = (index + 0.8) / services.length;
        
        cardsTl.to(
          card,
          {
            yPercent: -100,
            opacity: 0,
            scale: 0.9,
            ease: "power2.inOut",
          },
          exitStart
        );
      }
    });

    if (whatWeDoRef.current) {
      const timelineItems = whatWeDoRef.current.querySelectorAll('.timeline-item');
      const timelineLine = whatWeDoRef.current.querySelector('.timeline-line');
      
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: whatWeDoRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }
      
      timelineItems.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        const circle = item.querySelector('.timeline-circle');
        const box = item.querySelector('.timeline-box');
        
        if (circle) {
          gsap.from(circle, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          });
        }
        
        if (box) {
          gsap.from(box, {
            opacity: 0,
            x: isLeft ? -100 : 100,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          });
        }
      });
    }

    if (ctaSection && ctaText) {
      const ctaContent = ctaText.textContent || "";
      ctaText.textContent = "";
      
      const ctaChars = ctaContent.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.whiteSpace = char === " " ? "pre" : "normal";
        ctaText.appendChild(span);
        return span;
      });

      gsap.from(ctaChars, {
        yPercent: 100,
        opacity: 0,
        rotation: gsap.utils.random(-10, 10),
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 70%",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === heroSection ||
          trigger.vars.trigger === cardsContainer ||
          trigger.vars.trigger === ctaSection
        ) {
          trigger.kill();
        }
      });
      heroTl.kill();
    };
  }, []);

  const dots = [
    { top: '10%', left: '8%', size: 6, delay: 0 },
    { top: '20%', left: '88%', size: 8, delay: 0.5 },
    { top: '75%', left: '12%', size: 5, delay: 1 },
    { top: '85%', left: '82%', size: 7, delay: 1.5 },
    { top: '40%', left: '5%', size: 9, delay: 0.3 },
    { top: '60%', left: '92%', size: 6, delay: 0.8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section
          ref={heroSectionRef}
          className="h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden bg-background"
        >
          {dots.map((dot, index) => {
            return (
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
            );
          })}

          <div className="text-center fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 50 }}>
            <div className="flex flex-col items-center" style={{ marginTop: '-6rem' }}>
              <h1
                ref={heroTextRef}
                className="font-hero text-[15vw] md:text-[18vw] lg:text-[16vw] font-bold uppercase leading-[0.85] tracking-tight"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  mixBlendMode: 'difference',
                }}
              >
                OUR
              </h1>
              <h1
                ref={heroText2Ref}
                className="font-hero text-[15vw] md:text-[18vw] lg:text-[16vw] font-bold uppercase leading-[0.85] tracking-tight"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  mixBlendMode: 'difference',
                }}
              >
                SERVICES
              </h1>
            </div>
          </div>
        </section>

        <section
          ref={cardsContainerRef}
          className="relative h-screen overflow-hidden"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
            >
              <div className="w-full max-w-6xl">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <div className="text-sm uppercase tracking-widest text-purple-400 mb-4 font-hero">
                      {service.id} / {String(services.length).padStart(2, '0')}
                    </div>
                    <h2 className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-6 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 border border-foreground/20 text-foreground/70 text-sm uppercase tracking-wider hover:border-purple-500/50 hover:text-purple-300 transition-all duration-300"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-1 md:order-2">
                    <div className="relative">
                      <div
                        className="absolute inset-0 bg-purple-500/20 blur-3xl"
                        style={{
                          transform: 'translate(20px, 20px)',
                        }}
                      />
                      <img
                        src={service.image}
                        alt={service.title}
                        className="relative rounded-2xl w-full h-auto object-cover shadow-2xl"
                        style={{
                          aspectRatio: '4/3',
                        }}
                      />
                      <div className="absolute inset-0 border-2 border-foreground/10 rounded-2xl pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section
          ref={whatWeDoRef}
          className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20 relative overflow-hidden"
        >
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="font-hero text-5xl md:text-7xl font-bold uppercase mb-20 text-center">
              What We Do
            </h2>
            
            <div className="relative">
              {/* Center vertical line */}
              <div 
                className="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 bg-purple-500/30 origin-top"
                style={{ transform: 'translateX(-50%)' }}
              />
              
              {/* Timeline Items */}
              <div className="space-y-24">
                {/* Item 1 - Right side */}
                <div className="timeline-item relative">
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8 md:pr-16" />
                    <div className="timeline-circle absolute left-1/2 w-16 h-16 rounded-full bg-purple-600 border-4 border-background flex items-center justify-center font-hero text-2xl font-bold z-10" style={{ transform: 'translateX(-50%)' }}>
                      01
                    </div>
                    <div className="timeline-box w-1/2 pl-8 md:pl-16">
                      <div className="relative p-6 md:p-8 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 bg-gradient-to-br from-background to-purple-950/10 backdrop-blur-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <h3 className="font-hero text-xl md:text-2xl font-bold uppercase mb-3 text-purple-400">Strategy</h3>
                          <p className="text-foreground/70 leading-relaxed">
                            We analyze your business goals and create a comprehensive digital strategy that aligns with your vision and drives measurable results.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 2 - Left side */}
                <div className="timeline-item relative">
                  <div className="flex items-center">
                    <div className="timeline-box w-1/2 pr-8 md:pr-16 text-right">
                      <div className="relative p-6 md:p-8 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 bg-gradient-to-bl from-background to-purple-950/10 backdrop-blur-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <h3 className="font-hero text-xl md:text-2xl font-bold uppercase mb-3 text-purple-400">Design</h3>
                          <p className="text-foreground/70 leading-relaxed">
                            Beautiful, intuitive interfaces that captivate users. We craft experiences that are both visually stunning and functionally superior.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-circle absolute left-1/2 w-16 h-16 rounded-full bg-purple-600 border-4 border-background flex items-center justify-center font-hero text-2xl font-bold z-10" style={{ transform: 'translateX(-50%)' }}>
                      02
                    </div>
                    <div className="w-1/2 pl-8 md:pl-16" />
                  </div>
                </div>

                {/* Item 3 - Right side */}
                <div className="timeline-item relative">
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8 md:pr-16" />
                    <div className="timeline-circle absolute left-1/2 w-16 h-16 rounded-full bg-purple-600 border-4 border-background flex items-center justify-center font-hero text-2xl font-bold z-10" style={{ transform: 'translateX(-50%)' }}>
                      03
                    </div>
                    <div className="timeline-box w-1/2 pl-8 md:pl-16">
                      <div className="relative p-6 md:p-8 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 bg-gradient-to-br from-background to-purple-950/10 backdrop-blur-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <h3 className="font-hero text-xl md:text-2xl font-bold uppercase mb-3 text-purple-400">Development</h3>
                          <p className="text-foreground/70 leading-relaxed">
                            Cutting-edge technology stack and best practices to build scalable, performant solutions that stand the test of time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 4 - Left side */}
                <div className="timeline-item relative">
                  <div className="flex items-center">
                    <div className="timeline-box w-1/2 pr-8 md:pr-16 text-right">
                      <div className="relative p-6 md:p-8 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 bg-gradient-to-bl from-background to-purple-950/10 backdrop-blur-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10">
                          <h3 className="font-hero text-xl md:text-2xl font-bold uppercase mb-3 text-purple-400">Deployment</h3>
                          <p className="text-foreground/70 leading-relaxed">
                            Seamless launch and continuous optimization to ensure your product performs at its peak and scales with your growth.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-circle absolute left-1/2 w-16 h-16 rounded-full bg-purple-600 border-4 border-background flex items-center justify-center font-hero text-2xl font-bold z-10" style={{ transform: 'translateX(-50%)' }}>
                      04
                    </div>
                    <div className="w-1/2 pl-8 md:pl-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={ctaSectionRef}
          className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden"
        >
          <div className="text-center relative z-10 max-w-4xl">
            <h2
              ref={ctaTextRef}
              className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-8 leading-tight"
            >
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto">
              Let's turn your vision into reality. Get in touch with us today and start your digital transformation journey.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-hero uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Get Started
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
