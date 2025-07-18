import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import PhotoGrid from "./components/PhotoGrid";
import VideoSection from "./components/VideoSection";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import GooeyNav from "./components/Navbar";
import Studio from "./components/Studio";
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

type CurrentPage = "home" | "portfolio" | "studio" | "contact";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<CurrentPage>("home");

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const navItems = [
    {
      label: "Home",
      href: "#home",
      onClick: () => setCurrentPage("home"),
    },
    {
      label: "Portfolio",
      href: "#portfolio",
      onClick: () => setCurrentPage("portfolio"),
    },
    {
      label: "Studio",
      href: "#studio",
      onClick: () => setCurrentPage("studio"),
    },
    {
      label: "Contact",
      href: "#contact",
      onClick: () => setCurrentPage("contact"),
    },
  ];

  const handleNavClick = (item: any) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  const getActiveIndex = () => {
    switch (currentPage) {
      case "home":
        return 0;
      case "portfolio":
        return 1;
      case "studio":
        return 2;
      case "contact":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className="relative bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Navigation - Fixed positioning */}
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40">
              <GooeyNav
                key={currentPage}
                items={navItems}
                initialActiveIndex={getActiveIndex()}
                onItemClick={handleNavClick}
              />
            </div>

            {/* Page Content */}
            <AnimatePresence mode="wait">
              {currentPage === "home" && (
                <motion.div
                  key="home"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1] as const,
                  }}
                >
                  <Hero onNavigateToPortfolio={() => setCurrentPage("portfolio")} />
                  <PhotoGrid onNavigateToPortfolio={() => setCurrentPage("portfolio")} />
                  <VideoSection />
                  <Testimonials />
                </motion.div>
              )}

              {currentPage === "portfolio" && (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1] as const,
                  }}
                >
                  <Portfolio />
                </motion.div>
              )}

              {currentPage === "studio" && (
                <motion.div
                  key="studio"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="min-h-screen flex items-center justify-center"
                >
                  <Studio onNavigateToPortfolio={() => setCurrentPage("contact")} />
                </motion.div>
              )}

              {currentPage === "contact" && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Contact />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer outside AnimatePresence to prevent re-animation */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;