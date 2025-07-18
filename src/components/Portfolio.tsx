import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Camera, Heart, Users, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { projects } from '../data/Portfolio';

interface PhotoProject {
  id: number
  title: string
  category: PhotoCategory
  description: string
  image: string
  images: string[]
  videos?: string[]
  location?: string
  year?: string
}

type PhotoCategory = "All" | "Portraits" | "Weddings" | "Events" | "Fashion" | "Commercial"

const categories: PhotoCategory[] = ["All", "Portraits", "Weddings", "Events", "Fashion", "Commercial"]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>("All")
  const [selectedProject, setSelectedProject] = useState<PhotoProject | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const handleProjectClick = (project: PhotoProject) => {
    setSelectedProject(project)
    setCurrentMediaIndex(0)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedProject(null)
    setCurrentMediaIndex(0)
  }

  const getCurrentMedia = () => {
    if (!selectedProject) return null
    
    const allMedia = [
      ...selectedProject.images.map(url => ({ type: 'image', url })),
      ...(selectedProject.videos || []).map(url => ({ type: 'video', url }))
    ]
    
    return allMedia
  }

  const navigateMedia = (direction: 'prev' | 'next') => {
    const media = getCurrentMedia()
    if (!media) return

    if (direction === 'prev') {
      setCurrentMediaIndex(prev => prev === 0 ? media.length - 1 : prev - 1)
    } else {
      setCurrentMediaIndex(prev => prev === media.length - 1 ? 0 : prev + 1)
    }
  }

  const isVideo = (url: string) => {
    return url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') || url.includes('video')
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

  const getCategoryIcon = (category: PhotoCategory) => {
    switch (category) {
      case "Portraits":
        return <Users className="w-4 h-4" />
      case "Weddings":
        return <Heart className="w-4 h-4" />
      case "Fashion":
        return <Sparkles className="w-4 h-4" />
      default:
        return <Camera className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Enhanced Typography Styles */}
      <style>{`
        .portfolio-title {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #fdf2f8 25%,
            #fce7f3 50%,
            #f3e8ff 75%,
            #ffffff 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: portfolioGradient 8s ease-in-out infinite;
        }
        
        @keyframes portfolioGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .glass-filter {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <div className="min-h-screen bg-black">
        {/* Enhanced Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1920)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

          <div className="relative h-full flex items-center justify-center">
            <motion.div
              className="text-center px-4 max-w-5xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <span className="font-space inline-block text-sm uppercase tracking-[0.4em] text-pink-300 font-medium mb-6 bg-gradient-to-r from-pink-400/20 to-rose-400/20 px-6 py-2 rounded-full border border-pink-400/30">
                  Our Portfolio
                </span>
              </motion.div>

              <motion.h1
                className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <span className="portfolio-title">
                  Captured
                </span>
                <br />
                <span className="font-space text-white font-light tracking-[0.1em] text-5xl md:text-7xl lg:text-8xl">
                  MEMORIES
                </span>
              </motion.h1>

              <motion.p
                className="font-cormorant text-gray-300 text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                "Every photograph tells a story. Explore our collection of moments transformed into timeless art."
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Category Filter */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 ease-out cursor-hover font-space font-medium tracking-wide
                  glass-filter
                  ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-500 shadow-lg shadow-pink-500/25"
                      : "text-gray-300 border-gray-600 hover:bg-white/10 hover:text-white hover:border-gray-400"
                  }
                `}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                className="relative h-[400px] overflow-hidden group rounded-3xl cursor-pointer cursor-hover bg-gray-900 border border-pink-500/20"
                onClick={() => handleProjectClick(project)}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img
                  src={project.images[0] || project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Image count indicator */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.images.length + (project.videos?.length || 0)} items
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="flex items-center gap-2 mb-3">
                      {getCategoryIcon(project.category)}
                      <span className="font-space text-pink-300 text-sm uppercase tracking-wider font-medium">{project.category}</span>
                    </div>

                    <h3 className="font-playfair text-2xl font-bold text-white mb-3">{project.title}</h3>

                    <p className="font-inter text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>

                    {project.location && (
                      <div className="flex items-center gap-4 text-xs text-gray-400 font-inter">
                        <span>{project.location}</span>
                        {project.year && <span>•</span>}
                        {project.year && <span>{project.year}</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Always visible title overlay for mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent block md:hidden">
                  <h3 className="font-playfair text-xl font-bold text-white mb-1">{project.title}</h3>
                  <span className="font-space text-pink-300 text-sm uppercase tracking-wider">{project.category}</span>
                </div>

                {/* Enhanced border effect */}
                <div className="absolute inset-0 border-2 border-pink-400/0 group-hover:border-pink-400/50 rounded-3xl transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Enhanced Philosophy Section */}
          <motion.div
            className="max-w-5xl mx-auto text-center my-24 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="font-space block text-sm uppercase tracking-[0.3em] text-pink-400 mb-8 font-medium">Our Philosophy</span>

            <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight">
              <span className="bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent">
                Every moment
              </span>
              <br />
              <span className="font-space text-white font-light text-4xl md:text-5xl lg:text-6xl tracking-wide">
                DESERVES TO BE ETERNAL
              </span>
            </h2>

            <p className="font-inter text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              We believe that photography is more than just capturing images—it's about preserving emotions, telling
              stories, and creating art that transcends time. Each frame we capture is a piece of your story, crafted with
              <em className="font-cormorant text-pink-300"> passion and precision</em>.
            </p>
          </motion.div>
        </div>

        {/* Enhanced Media Gallery Dialog */}
        <AnimatePresence>
          {selectedProject && isDialogOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
            >
              <motion.div
                className="relative max-w-7xl max-h-[95vh] w-full glass-filter rounded-3xl overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-white">{selectedProject.title}</h3>
                    <p className="text-gray-400 text-sm">{getCurrentMedia()?.length} items</p>
                  </div>
                  <button
                    onClick={closeDialog}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors duration-200 flex items-center justify-center cursor-hover"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Media Display */}
                <div className="relative flex-1 bg-black/50">
                  {getCurrentMedia() && getCurrentMedia()![currentMediaIndex] && (
                    <div className="relative h-[60vh] flex items-center justify-center">
                      {isVideo(getCurrentMedia()![currentMediaIndex].url) ? (
                        <video
                          src={getCurrentMedia()![currentMediaIndex].url}
                          controls
                          autoPlay
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      ) : (
                        <img
                          src={getCurrentMedia()![currentMediaIndex].url}
                          alt={`${selectedProject.title} - Image ${currentMediaIndex + 1}`}
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      )}

                      {/* Navigation Controls */}
                      {getCurrentMedia() && getCurrentMedia()!.length > 1 && (
                        <>
                          <button
                            onClick={() => navigateMedia('prev')}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-colors duration-200 flex items-center justify-center cursor-hover"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => navigateMedia('next')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/90 transition-colors duration-200 flex items-center justify-center cursor-hover"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </>
                      )}

                      {/* Media Counter */}
                      {getCurrentMedia() && getCurrentMedia()!.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                          {currentMediaIndex + 1} / {getCurrentMedia()!.length}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {getCurrentMedia() && getCurrentMedia()!.length > 1 && (
                  <div className="p-6 border-t border-white/10">
                    <div className="flex gap-4 overflow-x-auto">
                      {getCurrentMedia()!.map((media, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            currentMediaIndex === index
                              ? 'border-pink-500 ring-2 ring-pink-500/50'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          {isVideo(media.url) ? (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                              <Camera className="w-6 h-6 text-white" />
                            </div>
                          ) : (
                            <img
                              src={media.url}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Info */}
                <div className="p-6 border-t border-white/10">
                  <p className="font-inter text-gray-400 mb-4 text-lg leading-relaxed">{selectedProject.description}</p>
                  {selectedProject.location && (
                    <div className="flex items-center gap-4 text-sm text-gray-500 font-inter">
                      <span>{selectedProject.location}</span>
                      {selectedProject.year && <span>•</span>}
                      {selectedProject.year && <span>{selectedProject.year}</span>}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}