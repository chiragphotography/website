import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface GooeyNavItem {
  label: string
  href: string
  onClick?: () => void
}

export interface GooeyNavProps {
  items: GooeyNavItem[]
  initialActiveIndex?: number
  onItemClick?: (index: number, item: GooeyNavItem) => void
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  initialActiveIndex = 0,
  onItemClick,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex)

  const handleClick = (index: number, item: GooeyNavItem) => {
    setActiveIndex(index)

    if (item.onClick) {
      item.onClick()
    }

    if (onItemClick) {
      onItemClick(index, item)
    }
  }

  return (
    <div className="gooey-nav-container backdrop-blur-xl bg-black/30 border border-white/10 rounded-full shadow-lg shadow-black/30 p-1.5 sm:p-2">
      <nav className="relative">
        <ul className="flex gap-1 sm:gap-2 md:gap-3 list-none p-0 m-0 relative">
          {items.map((item, index) => (
            <li key={index} className="relative">
              <motion.a
                href={item.href}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium rounded-full relative z-10 transition-colors duration-300 block ${
                  activeIndex === index 
                    ? "text-white" 
                    : "text-white/80 hover:text-white"
                }`}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault()
                  }
                  handleClick(index, item)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
              
              {activeIndex === index && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full z-0"
                  layoutId="activeNavItem"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default GooeyNav