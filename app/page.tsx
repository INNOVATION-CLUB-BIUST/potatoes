'use client'
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import AboutSection from "@/components/about-section";
import HeroSection from "@/components/hero-section";

import { useRef, useState, useEffect } from "react";
import { useRevealer } from "@/hooks/useRevealer";
import { useTheme } from "next-themes";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState<string | null>(null);
 
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useTransitionRouter();
  const pathname = usePathname();

  const triggerPageTransition = () => {
    if (typeof document === 'undefined' || !document.startViewTransition) return;
    document.documentElement.animate([
      {
        clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)",
      },
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      },
    ], {
      duration: 1200,
      easing: "cubic-bezier(0.9, 0, 0.1, 1)",
      pseudoElement: "::view-transition-new(root)",
    });
  };

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (path === pathname) {
      return;
    }
    router.push(path, { onTransitionReady: triggerPageTransition });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeTab) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeTab]);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    container: containerRef,
    offset: ["start start", "end start"]
  });

  // Hero section shrinking effect (0 to 1 over the hero container height)
  const imgWidth = useTransform(heroScroll, [0, 1], ["100%", "85%"]);
  const imgHeight = useTransform(heroScroll, [0, 1], ["100%", "70%"]);
  const imgRadius = useTransform(heroScroll, [0.5, 1], ["0px", "60px"]);
  const imgShadow = useTransform(heroScroll, [0.5, 1], ["0px 0px 0px rgba(0,0,0,0)", "0px 40px 80px rgba(0,0,0,0.3)"]);
  const imgScale = useTransform(heroScroll, [0, 1], [1, 1.25]);

  // Transitions (text and background) - theme-aware
  const isDark = mounted && resolvedTheme === 'dark';
  
  const heroBackgroundColor = useTransform(
    heroScroll, 
    [0.5, 1], 
    isDark ? ["#050505", "#121212"] : ["#050505", "#fdfbf7"]
  );
  const backgroundColor = heroBackgroundColor;

  const heroTextColor = useTransform(
    heroScroll, 
    [0.5, 1], 
    isDark ? ["#ffffff", "#f5f5f5"] : ["#ffffff", "#121212"]
  );
  const textColor = heroTextColor;

  const textSecondary = useTransform(
    heroScroll, 
    [0.5, 1], 
    isDark ? ["rgba(255,255,255,0.6)", "rgba(255,255,255,0.6)"] : ["rgba(255,255,255,0.6)", "rgba(0,0,0,0.6)"]
  );
  const headerOpacity = useTransform(heroScroll, [0, 0.3], [1, 0]);

  useMotionValueEvent(textColor, "change", (latest) => {
    if (typeof document !== 'undefined') {
       document.documentElement.style.setProperty('--text-primary', latest);
    }
  });

  const variants = {
    section: VARIANTS_SECTION,
  };

  useRevealer();
  
  return (
    <>
      <div className="relative bg-black min-h-screen">
        <motion.div
          animate={{
            scale: activeTab ? 0.94 : 1,
            opacity: activeTab ? 0.6 : 1,
            filter: activeTab ? "blur(8px)" : "blur(0px)",
            borderRadius: activeTab ? "48px" : "0px",
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="origin-center h-full min-h-screen overflow-hidden"
          style={{
             backgroundColor: backgroundColor,
          }}
        >
          <motion.div
            ref={containerRef}
            className="relative h-screen overflow-y-auto overflow-x-hidden"
            style={{
              color: textColor,
            }}
          >
            <HeroSection
              heroRef={heroRef}
              imgWidth={imgWidth}
              imgHeight={imgHeight}
              imgRadius={imgRadius}
              imgShadow={imgShadow}
              imgScale={imgScale}
              headerOpacity={headerOpacity}
              variants={variants}
              transition={TRANSITION_SECTION}
            
              handleNavigation={handleNavigation}
            />

            <motion.main
              className="relative z-20 flex flex-col w-full px-6 md:px-24 mx-auto"
              variants={VARIANTS_CONTAINER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, root: containerRef }}
            >
              <div id="about" className="min-h-screen flex flex-col justify-center">
                 <AboutSection variants={variants} transition={TRANSITION_SECTION} setActiveTab={setActiveTab} />
              </div>
            </motion.main>


          </motion.div>
        </motion.div>

     
      </div>
    </>
  );
}
