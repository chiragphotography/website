import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { photoItems } from '../data/PhotoGrid';

interface PhotoGridProps {
  onNavigateToPortfolio?: () => void
}

interface PhotoItem {
  originalIndex: number
  src: string
  alt: string
  height: string
  text: string
  animation: string
}

// Organize photos into columns for better control
const organizePhotosIntoColumns = () => {
  const columns: PhotoItem[][] = [[], [], [], []]

  photoItems.forEach((photo, index) => {
    const columnIndex = index % 4
    columns[columnIndex].push({ ...photo, originalIndex: index })
  })

  return columns
}

const getAnimationVariants = (animationType: string) => {
  switch (animationType) {
    case "left":
      return {
        initial: { opacity: 0, x: -100, filter: "blur(0px)" },
        animate: { opacity: 1, x: 0, filter: "blur(0px)" },
      }
    case "right":
      return {
        initial: { opacity: 0, x: 100, filter: "blur(0px)" },
        animate: { opacity: 1, x: 0, filter: "blur(0px)" },
      }
    case "down":
      return {
        initial: { opacity: 0, y: -100, filter: "blur(0px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      }
    case "blur":
      return {
        initial: { opacity: 0.3, filter: "blur(10px)", scale: 0.9 },
        animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
      }
    default:
      return {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
      }
  }
}

const PhotoCard = ({ item, index }: { item: (typeof photoItems)[0]; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)
  const variants = getAnimationVariants(item.animation)

  return (
    <motion.div
      ref={ref}
      initial={variants.initial}
      animate={
        isInView
          ? {
              ...variants.animate,
              transition: {
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : {}
      }
      whileHover={{
        scale: 1.05,
        y: -10,
        zIndex: 50,
        transition: { duration: 0.3 },
      }}
      className={`w-full ${item.height} mb-6 overflow-hidden rounded-3xl relative group cursor-pointer border border-pink-200/20`}
      style={{
        filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.1))",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{
          scale: isHovered ? 1.2 : 1.1,
          transition: { duration: 0.6, ease: "easeOut" },
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        initial={{ opacity: 0.4 }}
        animate={{
          opacity: isHovered ? 0.8 : 0.5,
          transition: { duration: 0.3 },
        }}
      />

      <motion.div
        className="absolute bottom-4 left-4 right-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isHovered ? 1 : 0.9,
          y: isHovered ? 0 : 10,
          transition: { duration: 0.3, delay: 0.1 },
        }}
      >
        <h3 className="font-playfair text-white font-bold text-lg mb-1 drop-shadow-lg">{item.text}</h3>
      </motion.div>

      <motion.div
        className="absolute inset-0 border-2 border-pink-400/50 rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          transition: { duration: 0.3 },
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-200/10 to-rose-200/10 rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          transition: { duration: 0.4 },
        }}
      />
    </motion.div>
  )
}

const FloatingElement = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-pink-300/20 rounded-full"
    initial={{
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: typeof window !== "undefined" ? window.innerHeight : 1000,
      opacity: 0,
    }}
    animate={{
      y: -50,
      opacity: [0, 1, 0],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 12,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeOut",
    }}
  />
)

export default function PhotoGrid({ onNavigateToPortfolio }: PhotoGridProps = {}) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const columns = organizePhotosIntoColumns()

  return (
    <>
      {/* Enhanced Typography Styles */}
      <style>{`
        .photogrid-title {
          background: linear-gradient(
            135deg,
            #1f2937 0%,
            #374151 25%,
            #ec4899 50%,
            #f43f5e 75%,
            #1f2937 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: photogridGradient 8s ease-in-out infinite;
        }
        
        @keyframes photogridGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-pink-50/30 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.8} />
          ))}
        </div>

        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(219,39,119,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
                  }
                : {}
            }
            className="text-center mb-16"
          >
            <motion.h2
              className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-8 tracking-tight leading-none"
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      transition: { duration: 1.2, delay: 0.3 },
                    }
                  : {}
              }
            >
              Captured{" "}
              <span className="photogrid-title font-medium">
                Memories
              </span>
            </motion.h2>

            <motion.p
              className="font-inter text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      transition: { duration: 1, delay: 0.6 },
                    }
                  : {}
              }
            >
              Every celebration tells a story. From intimate moments to grand celebrations, we capture the essence of your
              most precious memories with <em className="font-cormorant text-pink-600">artistic vision</em>.
            </motion.p>

            <motion.div
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-8"
              initial={{ scaleX: 0 }}
              animate={
                isInView
                  ? {
                      scaleX: 1,
                      transition: { duration: 1.5, delay: 0.9 },
                    }
                  : {}
              }
            />
          </motion.div>

          {/* Custom Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Column 1 */}
            <div className="flex flex-col">
              {columns[0].map((item) => (
                <PhotoCard key={`col1-${item.originalIndex}`} item={item} index={item.originalIndex} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              {columns[1].map((item) => (
                <PhotoCard key={`col2-${item.originalIndex}`} item={item} index={item.originalIndex} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              {columns[2].map((item) => (
                <PhotoCard key={`col3-${item.originalIndex}`} item={item} index={item.originalIndex} />
              ))}

              {/* Enhanced CTA Button positioned in column 3 */}
              <motion.div
                className="mt-8 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, delay: 1.7 },
                      }
                    : {}
                }
              >
                <motion.button
                  className="group relative w-full px-8 py-5 bg-white border-2 border-pink-200 text-gray-800 rounded-3xl font-space font-semibold text-lg tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 cursor-hover overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(219,39,119,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onNavigateToPortfolio}
                >
                  <span className="relative z-10 uppercase tracking-wider">View Complete Portfolio</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl opacity-0 group-hover:opacity-10"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col">
              {columns[3].map((item) => (
                <PhotoCard key={`col4-${item.originalIndex}`} item={item} index={item.originalIndex} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
