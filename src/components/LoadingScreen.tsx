import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

function VerticalWipe({ startWipe }: { startWipe: boolean }) {
  return (
    <AnimatePresence>
      {startWipe && (
        <>
          {/* Top Half Wipe */}
          <motion.div
            className="absolute inset-x-0 top-0 bg-black z-[60]"
            initial={{ height: 0 }}
            animate={{ height: "50vh" }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {/* Bottom Half Wipe */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-black z-[60]"
            initial={{ height: 0 }}
            animate={{ height: "50vh" }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05,
            }}
          />

          {/* Final Flash */}
          <motion.div
            className="absolute inset-0 bg-white z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{
              duration: 0.25,
              delay: 1.0,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showOrb, setShowOrb] = useState(false);
  const [startMorphing, setStartMorphing] = useState(false);
  const [startDissolve, setStartDissolve] = useState(false);
  const [startWipeEffect, setStartWipeEffect] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 600);
    const orbTimer = setTimeout(() => setShowOrb(true), 1000);
    const subtextTimer = setTimeout(() => setShowSubtext(true), 1800);
    const morphTimer = setTimeout(() => setStartMorphing(true), 3500);
    const dissolveTimer = setTimeout(() => setStartDissolve(true), 4500);
    const wipeTimer = setTimeout(() => setStartWipeEffect(true), 5200);
    const completeTimer = setTimeout(() => onComplete(), 6800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.max(0.5, (100 - prev) * 0.02);
        return Math.min(100, prev + increment);
      });
    }, 50);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(orbTimer);
      clearTimeout(subtextTimer);
      clearTimeout(morphTimer);
      clearTimeout(dissolveTimer);
      clearTimeout(wipeTimer);
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@100;200;300;400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&family=Space+Grotesk:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap');
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-crimson { font-family: 'Crimson Text', serif; }
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        
        .text-glow {
          text-shadow: 
            0 0 10px rgba(236, 72, 153, 0.5),
            0 0 20px rgba(236, 72, 153, 0.3),
            0 0 40px rgba(236, 72, 153, 0.1);
        }
      `}</style>

      <motion.div className="fixed inset-0 z-50 overflow-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
          
          {/* Floating Particles */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                background: `hsl(${Math.random() * 60 + 300}, 70%, 80%)`,
                filter: "blur(0.5px)",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -100 - Math.random() * 50],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-8">
          {/* Magical Orb */}
          <AnimatePresence>
            {showOrb && (
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <motion.div
                  className="w-32 h-32 rounded-full relative"
                  style={{
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(244, 63, 94, 0.6) 40%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Text */}
          <AnimatePresence>
            {showText && (
              <motion.div
                className="text-center relative z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.5 }}
              >
                <motion.h1
                  className="font-playfair text-8xl md:text-9xl lg:text-[12rem] py-8 font-bold tracking-[-0.03em] leading-none text-white text-glow"
                  initial={{ letterSpacing: "0.5em", opacity: 0 }}
                  animate={{ letterSpacing: "-0.03em", opacity: 1 }}
                  transition={{ duration: 3 }}
                >
                  Chirag
                </motion.h1>

                <motion.h2
                  className="font-space text-4xl md:text-5xl lg:text-6xl font-light text-gray-200 tracking-[0.3em] uppercase"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, delay: 1 }}
                >
                  Photography
                </motion.h2>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tagline */}
          <AnimatePresence>
            {showSubtext && (
              <motion.div
                className="mt-16 text-center z-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
              >
                <motion.p className="font-cormorant text-2xl md:text-3xl text-gray-300 font-light tracking-wide leading-relaxed italic">
                  "Capture moments for Infinity"
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
          >
            <div className="relative w-80 h-1 bg-gray-800/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="text-center mt-3">
              <motion.span className="font-inter text-xs text-pink-300 font-medium">
                {Math.floor(progress)}%
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Morphing Effect */}
        <AnimatePresence>
          {startMorphing && (
            <motion.div className="absolute inset-0 z-40">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-br from-pink-500/30 to-rose-500/30 blur-xl"
                  style={{
                    width: `${Math.random() * 200 + 100}px`,
                    height: `${Math.random() * 200 + 100}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 2],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dissolve Effect */}
        <AnimatePresence>
          {startDissolve && (
            <motion.div className="absolute inset-0 z-50">
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, -100 - Math.random() * 200],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vertical Wipe - Final Animation */}
        <VerticalWipe startWipe={startWipeEffect} />
      </motion.div>
    </>
  );
}