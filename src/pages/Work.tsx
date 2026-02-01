import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileEnhancements from "@/components/MobileEnhancements";
import { MobileAnimatedSection } from "@/components/MobileAnimatedSection";
import MobileTextWithPopImages from "@/components/MobileTextWithPopImages";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Neural Commerce",
    category: "E-Commerce",
    type: "Website",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&h=800&fit=crop",
    year: "2024",
  },
  {
    id: 2,
    title: "Quantum Analytics",
    category: "Dashboard",
    type: "Web App",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    year: "2024",
  },
  {
    id: 3,
    title: "Mindful Wellness",
    category: "Health",
    type: "Mobile",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop",
    year: "2023",
  },
  {
    id: 4,
    title: "Urban Mobility",
    category: "Transport",
    type: "Mobile",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop",
    year: "2023",
  },
  {
    id: 5,
    title: "Creative Studio",
    category: "Design",
    type: "Website",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
    year: "2024",
  },
  {
    id: 6,
    title: "FinTech Pro",
    category: "Finance",
    type: "Web App",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop",
    year: "2024",
  },
  {
    id: 7,
    title: "EduLearn",
    category: "Education",
    type: "Mobile",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop",
    year: "2023",
  },
  {
    id: 8,
    title: "FoodHub",
    category: "Food Delivery",
    type: "Website",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop",
    year: "2024",
  },
];

const stats = [
  { number: "150+", label: "Projects Completed" },
  { number: "50+", label: "Happy Clients" },
  { number: "15+", label: "Awards Won" },
  { number: "8", label: "Years Experience" },
];

const capabilities = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Brand Identity",
  "AI Integration",
  "E-Commerce",
  "Cloud Solutions",
  "DevOps",
];

const metallicDots = [
  { top: '15%', left: '10%', size: 8, delay: 0, type: 'orange' },
  { top: '25%', left: '85%', size: 6, delay: 0.5, type: 'metallic' },
  { top: '70%', left: '15%', size: 10, delay: 1, type: 'orange' },
  { top: '80%', left: '80%', size: 5, delay: 1.5, type: 'metallic' },
  { top: '40%', left: '5%', size: 7, delay: 0.3, type: 'orange' },
  { top: '60%', left: '92%', size: 9, delay: 0.8, type: 'metallic' },
  { top: '10%', left: '60%', size: 4, delay: 1.2, type: 'metallic' },
  { top: '85%', left: '40%', size: 6, delay: 0.6, type: 'orange' },
  { top: '35%', left: '95%', size: 8, delay: 1.8, type: 'metallic' },
  { top: '55%', left: '8%', size: 5, delay: 0.2, type: 'orange' },
];

const Work = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const transformSectionRef = useRef<HTMLDivElement>(null);
  const portraitImagesRef = useRef<HTMLDivElement[]>([]);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const sixImagesRef = useRef<HTMLDivElement[]>([]);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const backgroundImagesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const heroText = heroTextRef.current;
    const heroSection = heroSectionRef.current;
    const transformSection = transformSectionRef.current;
    const heroImage = heroImageRef.current;
    const gridContainer = gridContainerRef.current;

    if (!heroText || !heroSection || !transformSection || !heroImage || !gridContainer) return;

    const isMobile = window.innerWidth < 768;

    // Mobile: GSAP - cards from left/right, stack effect, text scale
    if (isMobile) {
      const portfolioTitle = document.querySelector('.portfolio-title-section');
      const gridItems = gridContainer?.querySelectorAll('[class*="group"]');
      const mobileProjects = document.querySelectorAll('.mobile-project-card');
      
      if (portfolioTitle) {
        gsap.from(portfolioTitle, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.9,
          ease: "back.out(1.3)",
          scrollTrigger: { trigger: portfolioTitle, start: "top 85%" },
        });
        const title = portfolioTitle.querySelector('h2');
        if (title) {
          ScrollTrigger.create({
            trigger: portfolioTitle,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
            onUpdate: (self) => {
              gsap.to(title, {
                filter: `brightness(${0.85 + self.progress * 0.3})`,
                scale: 0.98 + self.progress * 0.04,
                duration: 0.1,
              });
            },
          });
        }
      }
      mobileProjects.forEach((el, i) => {
        const fromX = i % 2 === 0 ? -70 : 70;
        gsap.from(el, {
          opacity: 0,
          x: fromX,
          scale: 0.9,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          delay: i * 0.1,
        });
      });
      gridItems?.forEach((el, i) => {
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.from(el, {
          opacity: 0,
          x: fromX,
          scale: 0.92,
          duration: 0.75,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: el, start: "top 88%" },
          delay: i * 0.08,
        });
      });
      // Mobile scroll zoom - sections zoom in/out as they scroll
      const zoomSections = document.querySelectorAll('section');
      zoomSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const scale = p < 0.3 ? 0.97 + (p / 0.3) * 0.04 : p < 0.7 ? 1.01 : 1.01 - ((p - 0.7) / 0.3) * 0.04;
            gsap.set(section, { scale, transformOrigin: "center center" });
          },
        });
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }

    // Desktop: Split text into characters
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

    // Hero text animation with character effects
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

    // Transform animation: 3 portrait -> 1 landscape hero -> 6 images with overlay effect
    const transformTl = gsap.timeline({
      scrollTrigger: {
        trigger: transformSection,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        pin: true,
      },
    });

    // Initial state - Start with first hero
    transformTl.set(heroImage, { opacity: 1, scale: 1 });
    transformTl.set(portraitImagesRef.current, { opacity: 0, scale: 0.8 });
    transformTl.set(sixImagesRef.current, { opacity: 0, scale: 0.8, y: 50 });

    // Stage 1: First hero visible (0 - 0.2)
    transformTl.to({}, { duration: 0.2 });

    // Stage 2: Hero transforms to 3 portrait images (0.2 - 0.4)
    transformTl.to(heroImage, {
      opacity: 0,
      scale: 0.8,
      duration: 0.15,
      ease: "power2.in",
    }, 0.2);

    transformTl.to(portraitImagesRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.2,
      stagger: {
        each: 0.05,
        from: "center",
      },
      ease: "power2.out",
    }, 0.25);

    // Stage 3: Hold portrait images (0.4 - 0.55)
    transformTl.to({}, { duration: 0.15 });

    // Stage 4: Portrait images transform back to hero (0.55 - 0.7)
    transformTl.to(portraitImagesRef.current, {
      opacity: 0,
      scale: 1.2,
      y: -50,
      duration: 0.15,
      stagger: {
        each: 0.03,
        from: "center",
      },
      ease: "power2.inOut",
    }, 0.55);

    transformTl.to(heroImage, {
      opacity: 1,
      scale: 1,
      duration: 0.15,
      ease: "power2.out",
    }, 0.6);

    // Stage 5: Hold second hero (0.7 - 0.8)
    transformTl.to({}, { duration: 0.1 });

    // Stage 6: Hero clones into 6 images (0.8 - 1.0)
    transformTl.to(heroImage, {
      opacity: 0,
      scale: 0.8,
      duration: 0.15,
      ease: "power2.in",
    }, 0.8);

    transformTl.to(sixImagesRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.2,
      stagger: {
        each: 0.04,
        from: "center",
        grid: [2, 3],
      },
      ease: "back.out(1.2)",
    }, 0.85);

    // Background images fade in
    backgroundImagesRef.current.forEach((img, index) => {
      if (!img) return;

      gsap.fromTo(
        img,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 0.3,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridContainer,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          delay: index * 0.05,
        }
      );

      gsap.to(img, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridContainer,
          start: "top 20%",
          end: "top top",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <MobileEnhancements>
      <div className="min-h-screen bg-background">
        <Header />

      <main className="pt-20">
        {/* Hero Section with Text */}
        <section
          ref={heroSectionRef}
          className="min-h-screen md:h-screen flex items-start md:items-center justify-start md:justify-center pt-24 md:pt-0 px-6 md:px-12 relative overflow-hidden bg-background"
        >
          {/* Metallic Dots - add if missing */}
          {metallicDots.map((dot, index) => (
            <div
              key={index}
              className="absolute rounded-full animate-pulse"
              style={{
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
                background: dot.type === 'orange'
                  ? `radial-gradient(circle at 30% 30%, hsl(30, 100%, 65%) 0%, hsl(30, 100%, 55%) 40%, hsl(30, 90%, 45%) 70%, hsl(30, 80%, 35%) 100%)`
                  : `radial-gradient(circle at 30% 30%, hsl(220, 20%, 90%) 0%, hsl(220, 15%, 70%) 40%, hsl(220, 10%, 50%) 70%, hsl(220, 8%, 30%) 100%)`,
                boxShadow: dot.type === 'orange'
                  ? `0 ${dot.size / 4}px ${dot.size / 2}px rgba(255, 140, 0, 0.4)`
                  : `0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.3)`,
                animationDelay: `${dot.delay}s`,
                animationDuration: '3s',
              }}
            />
          ))}
          {/* Mobile: Stacked hero with Framer Motion */}
          <div className="md:hidden w-full relative z-50 space-y-4 pb-12">
            <MobileAnimatedSection animation="slideFromTop" delay={0}>
              <h1 className="font-hero text-5xl font-bold uppercase leading-tight text-foreground" style={{ textShadow: '0 4px 12px rgba(255, 140, 0, 0.3)' }}>
                OUR WORK
              </h1>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="slideFromLeft" delay={1}>
              <p className="text-white text-lg leading-relaxed" style={{ wordSpacing: '0.2em' }}>
                Transforming ideas into exceptional digital experiences.
              </p>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="slideFromRight" delay={2}>
              <p className="text-orange-500 font-semibold">Websites, apps, brands & AI solutions.</p>
            </MobileAnimatedSection>
            <MobileAnimatedSection animation="scaleUp" delay={3}>
              <a href="#portfolio-grid" className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-hero uppercase tracking-wider text-sm rounded-full transition-all">
                View Projects
              </a>
            </MobileAnimatedSection>
          </div>
          {/* Desktop: Centered hero */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none px-4" style={{ zIndex: 50 }}>
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
              OUR WORK
            </h1>
          </div>
        </section>

        {/* Portfolio Title Section */}
        <section className="portfolio-title-section py-12 md:py-20 px-6 md:px-12 text-center bg-background">
          <h2 className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-6">
            Our Portfolio
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto hidden md:block">
            Transforming ideas into exceptional digital experiences. Explore our diverse range of projects.
          </p>
        </section>

        <MobileTextWithPopImages
          blocks={[
            { type: "text", content: "Transforming " },
            { type: "image", content: "", image: projects[0].image, alt: "Design" },
            { type: "text", content: " ideas into exceptional " },
            { type: "image", content: "", image: projects[1].image, alt: "Digital" },
            { type: "text", content: " digital experiences." },
          ]}
        />

        {/* Transform Section: 1 Hero -> 3 Portrait -> 1 Hero -> 6 Images (Desktop) / Simple grid (Mobile) */}
        <section
          ref={transformSectionRef}
          className="min-h-[50vh] md:h-screen relative overflow-hidden bg-background py-12 md:py-0"
        >
          {/* Metallic Dots Background */}
          {metallicDots.map((dot, index) => (
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
              }}
            />
          ))}

          {/* Mobile: Simple featured projects grid */}
          <div className="md:hidden relative z-10 px-6 pb-8">
            <div className="grid grid-cols-2 gap-4">
              {projects.slice(0, 6).map((project, index) => (
                <div
                  key={project.id}
                  className="mobile-project-card group relative overflow-hidden rounded-xl aspect-square"
                >
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-xs uppercase text-orange-400 mb-1">{project.type}</p>
                    <h3 className="font-hero text-sm font-bold uppercase text-white">{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Content Container */}
          <div className="relative z-10 h-full hidden md:flex items-center justify-center px-6 md:px-12">

            {/* 3 Portrait Images */}
            <div className="absolute inset-0 flex items-center justify-center gap-6 px-6 md:px-12">
              {[projects[1], projects[2], projects[3]].map((project, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) portraitImagesRef.current[index] = el;
                  }}
                  className="relative w-64 md:w-80"
                  style={{ aspectRatio: '3/4' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-4 right-4">
                    <p className="text-xs uppercase tracking-widest text-white/80 mb-2">{project.type}</p>
                    <h3 className="font-hero text-xl font-bold uppercase text-white">{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Hero Landscape Image */}
            <div
              ref={heroImageRef}
              className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
            >
              <div className="relative w-full max-w-5xl" style={{ aspectRatio: '16/9' }}>
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-sm uppercase tracking-widest text-white/80 mb-2">Featured Project</p>
                  <h3 className="font-hero text-3xl md:text-5xl font-bold uppercase text-white">{projects[0].title}</h3>
                </div>
              </div>
            </div>

            {/* 6 Images Grid with Overlay Effect */}
            <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
              <div className="grid grid-cols-3 gap-4 max-w-5xl w-full">
                {projects.slice(0, 6).map((project, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) sixImagesRef.current[index] = el;
                    }}
                    className="relative"
                    style={{ aspectRatio: '4/3' }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-xl shadow-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs uppercase tracking-widest text-white/80 mb-1">{project.type}</p>
                      <h3 className="font-hero text-sm font-bold uppercase text-white">{project.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section
          ref={gridContainerRef}
          className="min-h-screen px-6 md:px-12 py-20 relative bg-background"
        >
          <div className="text-center mb-16">
            <h2 className="font-hero text-4xl md:text-6xl font-bold uppercase mb-4">
              All Projects
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              From startups to enterprises, we've delivered cutting-edge solutions that drive results.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div id="portfolio-grid" className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[200px]">
            {projects.map((project, index) => {
              const gridClasses = [
                "col-span-2 md:col-span-4 row-span-1 md:row-span-2",
                "col-span-2 md:col-span-4 row-span-1 md:row-span-3",
                "col-span-2 md:col-span-4 row-span-1 md:row-span-2",
                "col-span-2 md:col-span-8 row-span-1 md:row-span-2",
                "col-span-2 md:col-span-4 row-span-1 md:row-span-3",
                "col-span-2 md:col-span-4 row-span-1 md:row-span-2",
                "col-span-2 md:col-span-4 row-span-1 md:row-span-2",
                "col-span-2 md:col-span-4 row-span-1 md:row-span-3",
              ];

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    if (el) backgroundImagesRef.current[index] = el;
                  }}
                  className={`${gridClasses[index]} group relative overflow-hidden rounded-xl cursor-pointer`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs uppercase tracking-widest text-orange-400 mb-1">
                      {project.type}
                    </p>
                    <h3 className="font-hero text-lg font-bold uppercase text-white">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/70 mt-1">{project.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section - Orange Background */}
        <section 
          className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF8C00 0%, #ff6600 50%, #FF8C00 100%)',
          }}
        >
          {/* Dark dots on orange background */}
          {[
            { top: '10%', left: '5%', size: 8 },
            { top: '20%', left: '90%', size: 6 },
            { top: '80%', left: '10%', size: 10 },
            { top: '85%', left: '85%', size: 7 },
            { top: '45%', left: '8%', size: 9 },
            { top: '60%', left: '95%', size: 5 },
          ].map((dot, index) => (
            <div
              key={index}
              className="absolute rounded-full animate-pulse"
              style={{
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
                background: `radial-gradient(circle at 30% 30%, 
                  hsl(0, 0%, 15%) 0%, 
                  hsl(0, 0%, 10%) 40%, 
                  hsl(0, 0%, 5%) 70%, 
                  hsl(0, 0%, 0%) 100%)`,
                boxShadow: `0 ${dot.size / 4}px ${dot.size / 2}px rgba(0, 0, 0, 0.6)`,
                animationDuration: '3s',
                animationDelay: `${index * 0.3}s`,
              }}
            />
          ))}
          
          <div className="text-center relative z-10 max-w-4xl">
            <h2 className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-8 leading-tight text-black drop-shadow-lg">
              Let's Create Something Extraordinary
            </h2>
            <p className="text-lg md:text-xl text-black/80 mb-12 max-w-2xl mx-auto font-medium">
              Ready to bring your vision to life? Let's collaborate and build the future together.
            </p>
            <a
              href="/#contact"
              className="inline-block px-12 py-5 bg-black hover:bg-black/90 text-white font-hero uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-full"
            >
              Start a Project
            </a>
          </div>
        </section>
      </main>

        <Footer />
      </div>
    </MobileEnhancements>
  );
};

export default Work;
