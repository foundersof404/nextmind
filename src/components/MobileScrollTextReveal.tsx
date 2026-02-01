import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MobileScrollTextRevealProps {
  text: string;
  className?: string;
}

/**
 * Mobile-only section: scroll gets "stuck" (pinned) while text reveals
 * letter by letter from grey to white. Once complete, scroll continues.
 */
const MobileScrollTextReveal = ({ text, className = "" }: MobileScrollTextRevealProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLParagraphElement>(null);

  const chars = text.split("");

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const section = sectionRef.current;
    const textContainer = textContainerRef.current;
    if (!section || !textContainer) return;

    const charEls = textContainer.querySelectorAll("span");

    const triggers = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=400%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalChars = charEls.length;
        charEls.forEach((char, i) => {
          const charProgress = (progress * totalChars - i) / 1;
          const reveal = Math.min(1, Math.max(0, charProgress));
          const grey = 115;
          const white = 255;
          const r = Math.round(grey + (white - grey) * reveal);
          const g = Math.round(grey + (white - grey) * reveal);
          const b = Math.round(grey + (white - grey) * reveal);
          (char as HTMLElement).style.color = `rgb(${r}, ${g}, ${b})`;
        });
      },
    });

    return () => {
      triggers.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [text]);

  return (
    <section
      ref={sectionRef}
      className={`md:hidden min-h-screen flex items-center justify-center px-6 py-20 bg-background ${className}`}
    >
      <p
        ref={textContainerRef}
        className="font-hero text-2xl sm:text-3xl font-bold uppercase leading-relaxed text-center max-w-lg"
        style={{ lineHeight: 1.6 }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : "normal",
              color: "rgba(115, 115, 115, 1)",
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </section>
  );
};

export default MobileScrollTextReveal;
