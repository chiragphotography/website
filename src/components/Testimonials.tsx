import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Camera, Sparkles } from "lucide-react"
import { testimonials } from '../data/Testimonials'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative py-16 bg-gradient-to-br from-gray-50 via-white to-pink-50 overflow-hidden" style={{ minHeight: "80vh" }}>
      {/* Background gradient effects with lighter theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-white to-purple-100/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(236,72,153,0.08),transparent_50%)]" />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Simple Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-pink-600 to-gray-800 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Testimonials
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            What our clients say about their experience with us
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[400px] perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                }}
                className="absolute inset-0"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-pink-200/50 rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center relative overflow-hidden shadow-2xl shadow-pink-200/20">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-50/80 via-transparent to-purple-50/80 rounded-3xl" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Client Info */}
                    <motion.div
                      className="text-center lg:text-left"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{currentTestimonial.name}</h3>
                      <p className="text-pink-600 text-sm uppercase tracking-wider mb-6">{currentTestimonial.role}</p>

                      <div className="space-y-3 text-gray-600 text-sm">
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                          <Camera className="w-4 h-4 text-pink-500" />
                          <span>{currentTestimonial.event}</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                          <Sparkles className="w-4 h-4 text-pink-500" />
                          <span>{currentTestimonial.location}</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Testimonial Content */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <Quote className="w-12 h-12 text-pink-300 mb-4" />

                      <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-6">
                        "{currentTestimonial.text}"
                      </blockquote>

                      <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 -left-16 flex items-center">
            <motion.button
              onClick={goToPrevious}
              className="p-4 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/50 hover:bg-pink-50/80 hover:border-pink-300/60 transition-all duration-300 group shadow-lg"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-pink-600 transition-colors" />
            </motion.button>
          </div>

          <div className="absolute inset-y-0 -right-16 flex items-center">
            <motion.button
              onClick={goToNext}
              className="p-4 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/50 hover:bg-pink-50/80 hover:border-pink-300/60 transition-all duration-300 group shadow-lg"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-pink-600 transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? "w-12 h-3 bg-gradient-to-r from-pink-500 to-purple-500"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              } rounded-full`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  key={`progress-${currentIndex}`}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}