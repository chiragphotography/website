import { motion } from "framer-motion"
import { teamMembers, stats } from "../data/Studio"
import type { Variants } from 'framer-motion';

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      delay: 0.2,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const FloatingElement = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-pink-300/30 rounded-full"
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

interface PhotoGridProps {
  onNavigateToPortfolio?: () => void
}

export default function Studio({ onNavigateToPortfolio }: PhotoGridProps = {}) {
  return (
    <>
      {/* Custom Font Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .font-crimson {
          font-family: 'Crimson Text', serif;
        }
        
        .font-space {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gradient-border {
          position: relative;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(135deg, #ec4899, #f43f5e, #e11d48);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
        }
      `}</style>

      <div className="min-h-screen bg-black">
        {/* Enhanced Floating Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(25)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.6} />
          ))}

          {/* Additional geometric shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute w-2 h-2 border border-pink-400/20 rotate-45"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [45, 405],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.2,
              }}
            />
          ))}
        </div>

        {/* Enhanced Hero Section */}
        <div className="relative h-screen bg-black overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/studio/studio.jpg)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(219,39,119,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(244,63,94,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(236,72,153,0.05)_60deg,transparent_120deg)]" />
          </div>

          <div className="relative h-full flex items-center justify-center z-10">
            <motion.div
              className="text-center px-4 max-w-5xl"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.div className="inline-block mb-8" variants={fadeIn}>
                <span className="font-space text-xs uppercase tracking-[0.4em] text-pink-400 font-medium bg-gradient-to-r from-pink-400/20 to-rose-400/20 px-6 py-2 rounded-full border border-pink-400/30">
                  About Our Studio
                </span>
              </motion.div>

              <motion.h1
                className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight mb-8 text-shadow-glow"
                variants={fadeIn}
              >
                <span className="bg-gradient-to-r from-white via-pink-100 to-rose-200 bg-clip-text text-transparent italic px-4">
                  Chirag
                </span>
                <br />
                <span className="font-space text-white font-light tracking-[0.1em] text-5xl md:text-7xl lg:text-8xl">
                  Photography
                </span>
              </motion.h1>

              <motion.p
                className="font-crimson text-gray-200 text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed italic font-light"
                variants={fadeIn}
              >
                "Where every moment becomes a timeless masterpiece, and every celebration transforms into art"
              </motion.p>

              <motion.div className="flex items-center justify-center mt-12" variants={fadeIn}>
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
                <div className="mx-4 w-2 h-2 bg-pink-400 rounded-full" />
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-6 h-10 border-2 border-pink-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-pink-400 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>

        {/* Enhanced About Section */}
        <motion.div
          className="relative py-16 px-4 bg-gradient-to-br from-black via-gray-950 to-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div className="mb-8" variants={fadeIn}>
                  <span className="font-space text-sm uppercase tracking-[0.3em] text-pink-400 font-medium">
                    Our Story
                  </span>
                </motion.div>

                <motion.h2
                  className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 leading-tight"
                  variants={fadeIn}
                >
                  Creating{" "}
                  <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent italic">
                    Memories
                  </span>
                  <br />
                  <span className="font-space font-light text-4xl md:text-5xl lg:text-6xl tracking-wide">
                    THAT LAST FOREVER
                  </span>
                </motion.h2>
              </div>

              <motion.div className="relative" variants={fadeIn}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="relative group">
                      <img
                        src="https://images.unsplash.com/photo-1542596594-649edbc13630"
                        alt="Studio Work"
                        className="rounded-3xl shadow-2xl w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="relative group">
                      <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                        alt="Wedding Photography"
                        className="rounded-3xl shadow-2xl w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="space-y-6 mt-8">
                    <div className="relative group">
                      <img
                        src="https://images.unsplash.com/photo-1443916568596-df5a58c445e9"
                        alt="Portrait Session"
                        className="rounded-3xl shadow-2xl w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="relative group">
                      <img
                        src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"
                        alt="Event Photography"
                        className="rounded-3xl shadow-2xl w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-pink-400/30 rounded-full" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-xl" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <div className="relative py-12 glass-morphism">
          <motion.div
            className="max-w-7xl mx-auto px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div key={index} className="text-center group" variants={fadeIn} whileHover={{ scale: 1.05 }}>
                  <span className="font-playfair block text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </span>
                  <span className="font-space block text-gray-300 text-sm md:text-base uppercase tracking-wider font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Team Section */}
        <motion.div
          className="relative py-16 px-4 bg-gradient-to-br from-gray-950 via-black to-gray-950"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.div className="mb-6" variants={fadeIn}>
                <span className="font-space text-sm uppercase tracking-[0.3em] text-pink-400 font-medium">
                  The Artists
                </span>
              </motion.div>

              <motion.h2
                className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                variants={fadeIn}
              >
                Meet Our{" "}
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent italic">
                  Creative Team
                </span>
              </motion.h2>

              <motion.p
                className="font-inter text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed"
                variants={fadeIn}
              >
                Our passionate team of photographers and artists brings together years of experience and a shared vision
                for creating <em className="font-crimson text-pink-300">extraordinary visual stories</em>
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  className="group relative overflow-hidden rounded-3xl bg-gray-900 gradient-border"
                  variants={fadeIn}
                  whileHover={{ y: -12 }}
                >
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-96 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-playfair text-2xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="font-space text-pink-400 mb-3 text-sm uppercase tracking-wider font-medium">
                        {member.role}
                      </p>
                      {member.specialty && (
                        <p className="font-inter text-gray-300 text-sm leading-relaxed">{member.specialty}</p>
                      )}
                    </div>
                  </div>

                  {/* Always visible name overlay for mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent md:hidden landscape:hidden transition-opacity duration-300">
                    <h3 className="font-playfair text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="font-space text-pink-400 text-sm uppercase tracking-wider">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Values Section */}
        <div className="relative py-16 px-4 bg-gradient-to-br from-black via-gray-950 to-black">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
          </motion.div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="relative py-24 px-4 bg-black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              variants={fadeIn}
            >
              Ready to Create{" "}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent italic">
                Magic
              </span>
              ?
            </motion.h2>

            <motion.p
              className="font-crimson text-gray-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed italic"
              variants={fadeIn}
            >
              "Let's discuss your vision and create something extraordinary together. Every great story begins with a
              single conversation."
            </motion.p>

            <motion.button
              className="group relative px-12 py-5 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-space font-semibold text-lg tracking-wide shadow-2xl hover:shadow-pink-500/40 transition-all duration-500 cursor-hover overflow-hidden"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              variants={fadeIn}
              onClick={onNavigateToPortfolio}
            >
              <span className="relative z-10 uppercase tracking-wider">Get In Touch</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
