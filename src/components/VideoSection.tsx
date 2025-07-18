import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion'
import { Play, Pause, Camera, Film } from 'lucide-react'
import { videoItems } from '../data/Videos'

interface VideoItem {
  id: number
  title: string
  description: string
  category: string
  src: string
  thumbnail: string
  duration: string
}

type ParticleSize = 'small' | 'medium' | 'large'

interface VideoParticleProps {
  delay?: number
  duration?: number
  size?: ParticleSize
}

const VideoParticle = ({ delay = 0, duration = 12, size = "small" }: VideoParticleProps) => {
  const sizeClasses: Record<ParticleSize, string> = {
    small: "w-1 h-1",
    medium: "w-2 h-2",
    large: "w-3 h-3",
  }

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} bg-gradient-to-r from-pink-400 to-rose-400 rounded-full`}
      initial={{
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
        y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
        opacity: 0,
        scale: 0,
      }}
      animate={{
        y: -100,
        opacity: [0, 0.6, 0.3, 0],
        scale: [0, 1, 1.2, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  )
}

export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleVideoClick = (video: VideoItem, e: React.MouseEvent) => {
    // Prevent opening dialog if clicking on video controls
    if ((e.target as HTMLElement).closest('.video-controls')) {
      return
    }
    setSelectedVideo(video)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedVideo(null)
  }

  const toggleVideoPlay = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const video = document.getElementById(`video-${videoId}`) as HTMLVideoElement
    if (video) {
      if (video.paused) {
        video.play()
        setPlayingVideos(prev => new Set([...prev, videoId]))
      } else {
        video.pause()
        setPlayingVideos(prev => {
          const newSet = new Set(prev)
          newSet.delete(videoId)
          return newSet
        })
      }
    }
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div className="relative min-h-screen bg-black py-20 overflow-hidden">
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <VideoParticle
            key={i}
            delay={i * 0.4}
            duration={8 + Math.random() * 6}
            size={Math.random() > 0.8 ? "medium" : "small"}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

        {/* Film Grain */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Animated Icon */}
          <motion.div
            className="mb-8"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative inline-block">
              <Film className="w-16 h-16 text-pink-400 mx-auto" />
              <motion.div
                className="absolute -inset-4 border border-pink-400/30 rounded-full"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>

          <motion.span
            className="inline-block text-sm uppercase tracking-[0.3em] text-pink-300 font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Visual Stories
          </motion.span>

          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent">
              Cinematic
            </span>
            <br />
            <span className="text-white">Masterpieces</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience our work in motion. Each video tells a unique story, crafted with cinematic precision
            and artistic vision to preserve your most precious moments.
          </motion.p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoItems.map((video, i) => (
            <motion.div
              key={video.id}
              className="relative group cursor-pointer"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseEnter={() => setHoveredId(video.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => handleVideoClick(video, e)}
            >
              <div className="relative h-[320px] overflow-hidden rounded-2xl bg-gray-900">
                {/* Video Element */}
                <video
                  id={`video-${video.id}`}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  // muted={mutedVideos.has(video.id)}
                  loop
                  playsInline
                  poster={video.thumbnail}
                  onLoadedData={() => {
                    // Auto-play on hover for preview
                    const videoEl = document.getElementById(`video-${video.id}`) as HTMLVideoElement
                    if (videoEl && hoveredId === video.id) {
                      videoEl.currentTime = 0
                    }
                  }}
                >
                  <source src={video.src} type="video/mp4" />
                  {/* Fallback image */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </video>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500/80 to-rose-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium uppercase tracking-wider">
                  {video.category}
                </div>

                {/* Video Controls */}
                <div className="video-controls absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={(e) => toggleVideoPlay(video.id, e)}
                      className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {playingVideos.has(video.id) ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Camera className="w-4 h-4 text-pink-300" />
                      <span className="text-pink-300 text-sm uppercase tracking-wider">{video.category}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{video.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{video.description}</p>
                  </div>
                </div>

                {/* Mobile-friendly overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent block md:hidden">
                  <h3 className="text-xl font-bold text-white mb-1">{video.title}</h3>
                  <span className="text-pink-300 text-sm uppercase tracking-wider">{video.category}</span>
                </div>

                {/* Hover ring effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-pink-400/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={hoveredId === video.id ? {
                    borderColor: [
                      "rgba(236, 72, 153, 0.3)",
                      "rgba(244, 63, 94, 0.5)",
                      "rgba(236, 72, 153, 0.3)",
                    ],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
        </motion.div>
      </div>

      {/* Video Dialog */}
      <AnimatePresence>
        {selectedVideo && isDialogOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDialog}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeDialog}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors duration-200 flex items-center justify-center cursor-hover"
              >
                ×
              </button>

              <div className="aspect-video">
                <video
                  className="w-full h-full object-cover rounded-t-2xl"
                  controls
                  autoPlay
                  muted={false}
                  playsInline
                >
                  <source src={selectedVideo.src} type="video/mp4" />
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover"
                  />
                </video>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-pink-400 text-sm uppercase tracking-wider font-medium">
                    {selectedVideo.category}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">{selectedVideo.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}