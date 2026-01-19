import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isInputHovering, setIsInputHovering] = useState(false);
  const positionRef = useRef({
    distanceX: 0,
    distanceY: 0,
    pointerX: 0,
    pointerY: 0,
  });
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const angleRef = useRef({ current: 0, previous: 0, displace: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const degrees = 57.296;

    const rotate = (position: typeof positionRef.current) => {
      const unsortedAngle =
        Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) *
        degrees;
      
      angleRef.current.previous = angleRef.current.current;

      if (position.distanceX <= 0 && position.distanceY >= 0) {
        angleRef.current.current = 90 - unsortedAngle + 0;
      } else if (position.distanceX < 0 && position.distanceY < 0) {
        angleRef.current.current = unsortedAngle + 90;
      } else if (position.distanceX >= 0 && position.distanceY <= 0) {
        angleRef.current.current = 90 - unsortedAngle + 180;
      } else if (position.distanceX > 0 && position.distanceY > 0) {
        angleRef.current.current = unsortedAngle + 270;
      }

      if (isNaN(angleRef.current.current)) {
        angleRef.current.current = angleRef.current.previous;
      } else {
        const diff = angleRef.current.current - angleRef.current.previous;
        if (diff <= -270) {
          angleRef.current.displace += 360 + diff;
        } else if (diff >= 270) {
          angleRef.current.displace += diff - 360;
        } else {
          angleRef.current.displace += diff;
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      previousPointerRef.current.x = positionRef.current.pointerX;
      previousPointerRef.current.y = positionRef.current.pointerY;
      positionRef.current.pointerX = event.clientX;
      positionRef.current.pointerY = event.clientY;
      positionRef.current.distanceX =
        previousPointerRef.current.x - positionRef.current.pointerX;
      positionRef.current.distanceY =
        previousPointerRef.current.y - positionRef.current.pointerY;

      const distance = Math.sqrt(
        positionRef.current.distanceY ** 2 + positionRef.current.distanceX ** 2
      );

      // Check if hovering over interactive elements
      const target = event.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.onclick !== null ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-hover');
      
      const isInput = 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true';

      setIsHovering(isInteractive);
      setIsInputHovering(isInput);

      cursor.style.transform = `translate3d(${positionRef.current.pointerX}px, ${positionRef.current.pointerY}px, 0) rotate(${angleRef.current.displace}deg)`;

      if (distance > 1) {
        rotate(positionRef.current);
        cursor.style.transform = `translate3d(${positionRef.current.pointerX}px, ${positionRef.current.pointerY}px, 0) rotate(${angleRef.current.displace}deg)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        *, 
        *::before, 
        *::after,
        html,
        body,
        div,
        button,
        a,
        input,
        textarea,
        select {
          cursor: none !important;
        }
        
        .custom-cursor-arrow {
          position: fixed;
          top: 0;
          left: -10px;
          z-index: 2147483647;
          width: 32px;
          height: 32px;
          pointer-events: none;
          user-select: none;
          transition: all 250ms ease;
        }

        .custom-cursor-arrow.hovering {
          width: 48px;
          height: 48px;
          filter: hue-rotate(30deg) brightness(1.2) saturate(1.5);
        }

        .custom-cursor-arrow.input-hovering {
          width: 32px;
          height: 32px;
          filter: hue-rotate(180deg) brightness(1.3) saturate(1.5);
          opacity: 0.9;
        }

        .custom-cursor-arrow.input-hovering svg {
          transform: scaleX(0.4);
        }

        @media (pointer: coarse) {
          .custom-cursor-arrow {
            display: none;
          }
          * {
            cursor: auto !important;
          }
        }
      `}</style>
      <div 
        ref={cursorRef} 
        className={`custom-cursor-arrow ${isHovering ? 'hovering' : ''} ${isInputHovering ? 'input-hovering' : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path
            className="inner"
            d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z"
            fill="#F2F5F8"
          />
          <path
            className="outer"
            d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z"
            fill="#111920"
          />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
