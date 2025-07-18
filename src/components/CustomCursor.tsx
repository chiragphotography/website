import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastMoveTime, setLastMoveTime] = useState(0);

  useEffect(() => {
    document.body.style.cursor = "none";

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      setLastMoveTime(Date.now());

      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      const isPointerElement =
        computedStyle.cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.hasAttribute("onclick") ||
        target.getAttribute("role") === "button";

      setIsPointer(isPointerElement);
    };

    const handleMouseEnter = (e: Event) => {
      setIsHovering(true);
      const target = e.target as HTMLElement;
      if (window.getComputedStyle(target).cursor === "pointer") {
        setIsPointer(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsPointer(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    // Fallback for when mouseleave doesn't fire
    const checkMouseActivity = () => {
      if (Date.now() - lastMoveTime > 1000 && isVisible) {
        setIsVisible(false);
      }
    };

    const activityCheckInterval = setInterval(checkMouseActivity, 1000);

    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"], .cursor-hover, input, textarea, select, [onclick]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseleave", handleMouseLeaveWindow); // Additional check

    return () => {
      document.body.style.cursor = "";
      clearInterval(activityCheckInterval);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [lastMoveTime]);

  const getRotationAngle = () => {
    if (isPointer) return 0;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;

    return -10 + deltaX * 0.02 - deltaY * 0.02;
  };

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          transformOrigin: "center",
          outline: "none"
        }}
        animate={{
          scale: isClicking ? 1.2 : isHovering || isPointer ? 2.2 : 1.5,
          rotate: getRotationAngle(),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        }}
      >
        {isPointer ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 2L18 10L8 12L6 18L2 2Z"
              fill="white"
              stroke="black"
              strokeWidth="0.5"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 2L18 10L8 12L6 18L2 2Z"
              fill="white"
              stroke="black"
              strokeWidth="0.5"
            />
          </svg>
        )}
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[99998]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
          outline: "none",
          boxShadow: "none"
        }}
        animate={{
          scale: isHovering || isPointer ? 1.8 : 0,
          opacity: isVisible ? (isHovering || isPointer ? 0.3 : 0) : 0,
          backgroundColor: isPointer ? "#3b82f6" : "#ec4899",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <div className="w-5 h-5 rounded-full blur-sm" />
      </motion.div>
    </>
  );
}