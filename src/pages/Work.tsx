import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

    // Split text into characters
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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section with Text */}
        <section
          ref={heroSectionRef}
          className="h-screen flex items-center justify-center relative overflow-hidden bg-background"
        >
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
              OUR WORK
            </h1>
          </div>
        </section>

        {/* Portfolio Title Section */}
        <section className="py-20 px-6 md:px-12 text-center bg-background">
          <h2 className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-6">
            Our Portfolio
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Transforming ideas into exceptional digital experiences. Explore our diverse range of projects.
          </p>
        </section>

        {/* Transform Section: 1 Hero -> 3 Portrait -> 1 Hero -> 6 Images */}
        <section
          ref={transformSectionRef}
          className="h-screen relative overflow-hidden bg-background"
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

          {/* Content Container */}
          <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">

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
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 auto-rows-[200px]">
            {/* Background images that appear faded */}
            {projects.map((project, index) => {
              const isWebsite = project.type === "Website" || project.type === "Web App";
              const gridClasses = [
                "col-span-4 row-span-2", // Small square
                "col-span-4 row-span-3", // Portrait
                "col-span-4 row-span-2", // Small square
                "col-span-8 row-span-2", // Wide landscape
                "col-span-4 row-span-3", // Portrait
                "col-span-4 row-span-2", // Small square
                "col-span-4 row-span-2", // Small square
                "col-span-4 row-span-3", // Portrait
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
                    <p className="text-xs uppercase tracking-widest text-purple-400 mb-1">
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

        {/* CTA Section */}
        <section className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
          <div className="text-center relative z-10 max-w-4xl">
            <h2 className="font-hero text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-8 leading-tight">
              Let's Create Something Extraordinary
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto">
              Ready to bring your vision to life? Let's collaborate and build the future together.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-hero uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Start a Project
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Work;
