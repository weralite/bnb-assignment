"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAnimation, useScroll, useTransform } from 'framer-motion';

interface HeaderAnimationsProps {
  controls: ReturnType<typeof useAnimation>;
  heightControls: ReturnType<typeof useAnimation>;
  onScrollChange: (scrolled: boolean) => void;
}

export default function HeaderAnimations({ controls, heightControls, onScrollChange }: HeaderAnimationsProps) {
  const { scrollY } = useScroll();
  const scrollThreshold = 200;
  const isScrolled = useTransform(scrollY, [0, scrollThreshold], [false, true]);

  const [lastScrolled, setLastScrolled] = useState(false); 
  const [isMobile, setIsMobile] = useState(false); 
  const [throttleTimeout, setThrottleTimeout] = useState<NodeJS.Timeout | null>(null); 

  const handleResizeOrScroll = useCallback(() => {
      
    const currentIsMobile = window.innerWidth <= 639; 
    const scrolled = isScrolled.get();

    if (scrolled !== lastScrolled || currentIsMobile !== isMobile) {
      if (throttleTimeout) return;

      setLastScrolled(scrolled);
      setIsMobile(currentIsMobile); 

      controls.start({
        y: currentIsMobile ? -75 : scrolled ? -75 : 0,
        scale: currentIsMobile ? 1 : scrolled ? 0.8 : 1,
        width: currentIsMobile ? "100%" : scrolled ? "70%" : "100%",
        maxWidth: currentIsMobile ? "860px" : scrolled ? "600px" : "860px",
        transition: { duration: 0.1 }, 
      });

      heightControls.start({
        height: currentIsMobile ? "80px" : (scrolled ? "80px" : "160px"),
        transition: { duration: 0.1 }, 
      });

      onScrollChange(scrolled);

      const timeout = setTimeout(() => {
        setThrottleTimeout(null); 
      }, 200);

      setThrottleTimeout(timeout); 
    }
  }, [controls, heightControls, isScrolled, lastScrolled, isMobile, onScrollChange, throttleTimeout]);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 639);

    const handleScroll = () => {
      requestAnimationFrame(handleResizeOrScroll);
    };

    const handleResize = () => {
      requestAnimationFrame(handleResizeOrScroll); 
    };

    handleResizeOrScroll(); 

    const unsubscribe = isScrolled.on("change", handleScroll); 
    window.addEventListener("resize", handleResize); 

    return () => {
      unsubscribe(); 
      window.removeEventListener("resize", handleResize); 
      if (throttleTimeout) clearTimeout(throttleTimeout); 
    };
  }, [handleResizeOrScroll, isScrolled, throttleTimeout]);

  return null;
}