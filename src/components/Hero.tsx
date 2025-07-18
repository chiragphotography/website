import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

const mediaItems: MediaItem[] = [
  {
    type: 'image',
    src: 'https://static.vecteezy.com/system/resources/previews/050/494/463/non_2x/indian-weddinggraphy-in-bangalore-free-photo.jpg',
    alt: 'Indian bride in red silk saree with gold jewelry',
    title: 'Traditional Indian Bride',
    description: 'A bride adorned in a stunning red saree and intricate gold jewelry—pure timeless elegance'
  },
  {
    type: 'image',
    src: 'https://images.prismic.io/memoriesdesigner/af264e19-796a-4ff5-bc68-b54c3996a18e_4.png',
    alt: 'Groom during Haldi ceremony, turmeric paste on his face',
    title: 'Haldi Prelude',
    description: 'Joyful pre-wedding Haldi ceremony—vibrant turmeric rituals for laughter and blessings'
  },
  {
    "type": "image",
    "src": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "alt": "Conference event with stage lighting",
    "title": "Professional Excellence",
    "description": "Corporate gala with perfect lighting"
  },
  {
    "type": "image",
    "src": "https://images.pexels.com/photos/274131/pexels-photo-274131.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&fm=webp",
    "alt": "Luxury event venue with crystal chandeliers",
    "title": "Grand Soirée",
    "description": "Elegant reception under sparkling chandeliers"
  }
];

interface PhotoGridProps {
  onNavigateToPortfolio?: () => void
}

export default function Hero({ onNavigateToPortfolio }: PhotoGridProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [timerReset, setTimerReset] = useState(0);

  const currentMedia = mediaItems[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, timerReset]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    setTimerReset((prev) => prev + 1);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setTimerReset((prev) => prev + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoPlay = () => {
    setIsPlaying(false);
  };

  return (
    <>
      {/* Enhanced Typography Styles */}
      <style>{`
        .hero-title {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #fdf2f8 20%,
            #fce7f3 40%,
            #f3e8ff 60%,
            #e0e7ff 80%,
            #ffffff 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: heroGradient 6s ease-in-out infinite;
          text-shadow: 0 0 40px rgba(236, 72, 153, 0.3);
        }
        
        @keyframes heroGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .hero-subtitle {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .glass-card {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div className="relative h-screen w-full overflow-hidden bg-black">
        {/* Media Container */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0"
            >
              {currentMedia.type === 'image' ? (
                <img
                  src={currentMedia.src || "/placeholder.svg"}
                  alt={currentMedia.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={currentMedia.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onPlay={handleVideoPlay}
                />
              )}
              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-3xl px-6 py-8 backdrop-blur-sm bg-black/40 rounded-2xl border border-white/10 shadow-xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text py-2 text-transparent">
              Chirag Photography
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-2xl mb-6 text-pink-100/85 font-light italic"
            >
              "Capture the Moment for Infinity"
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-6 bg-white/5 p-4 rounded-lg backdrop-blur-xs"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                  {currentMedia.title}
                </h2>
                <p className="text-base md:text-lg text-pink-50/80 max-w-xl mx-auto">
                  {currentMedia.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-rose-500/30 transition-all duration-300 border border-white/20"
              onClick={onNavigateToPortfolio}
            >
              Explore Our Work
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Navigation Controls */}
        <div className="absolute inset-y-0 left-4 flex items-center z-20">
          <motion.button
            onClick={goToPrevious}
            className="p-4 rounded-full glass-card hover:bg-white/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center z-20">
          <motion.button
            onClick={goToNext}
            className="p-4 rounded-full glass-card hover:bg-white/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>

        {/* Enhanced Media Controls */}
        <div className="absolute bottom-6 left-6 flex items-center gap-4 z-20">
          <motion.button
            onClick={togglePlayPause}
            className="p-3 rounded-full glass-card hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </motion.button>

          {currentMedia.type === 'video' && (
            <motion.button
              onClick={toggleMute}
              className="p-3 rounded-full glass-card hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </motion.button>
          )}
        </div>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {mediaItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-white scale-125 shadow-lg shadow-white/50'
                : 'bg-white/50 hover:bg-white/70'
                }`}
              whileHover={{ scale: index === currentIndex ? 1.25 : 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Enhanced Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30 z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: isPlaying ? '100%' : '0%' }}
            transition={{ duration: 5, ease: "linear" }}
            key={`${currentIndex}-${isPlaying}`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}