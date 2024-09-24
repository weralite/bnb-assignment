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

  const [lastScrolled, setLastScrolled] = useState(false); // Track last scroll state
  const [isMobile, setIsMobile] = useState(false); // Track mobile state
  const [throttleTimeout, setThrottleTimeout] = useState<NodeJS.Timeout | null>(null); // Track timeout

  const handleResizeOrScroll = useCallback(() => {
    // Check if mobile on each call
    const currentIsMobile = window.innerWidth <= 639; 
    const scrolled = isScrolled.get();

    // Update only if the scroll state has changed
    if (scrolled !== lastScrolled || currentIsMobile !== isMobile) {
      // If a throttle timeout is already active, do not update
      if (throttleTimeout) return;

      setLastScrolled(scrolled);
      setIsMobile(currentIsMobile); // Update mobile state

      // Start animations
      controls.start({
        y: currentIsMobile ? -75 : scrolled ? -75 : 0,
        scale: currentIsMobile ? 1 : scrolled ? 0.8 : 1,
        width: currentIsMobile ? "100%" : scrolled ? "70%" : "100%",
        maxWidth: currentIsMobile ? "860px" : scrolled ? "600px" : "860px",
        transition: { duration: 0.3 }, // Control transition timing
      });

      heightControls.start({
        height: currentIsMobile ? "80px" : (scrolled ? "80px" : "160px"),
        transition: { duration: 0.3 }, // Control transition timing
      });

      onScrollChange(scrolled);

      // Set a throttle timeout for 200ms
      const timeout = setTimeout(() => {
        setThrottleTimeout(null); // Clear the throttle timeout after 200ms
      }, 200);

      setThrottleTimeout(timeout); // Store the timeout ID
    }
  }, [controls, heightControls, isScrolled, lastScrolled, isMobile, onScrollChange, throttleTimeout]);

  useEffect(() => {
    // Set initial mobile state on client side
    setIsMobile(window.innerWidth <= 639);

    const handleScroll = () => {
      requestAnimationFrame(handleResizeOrScroll);
    };

    const handleResize = () => {
      requestAnimationFrame(handleResizeOrScroll); // Call resize handler
    };

    handleResizeOrScroll(); // Initial call to set state based on current scroll position

    const unsubscribe = isScrolled.on("change", handleScroll); // Subscribe to scroll changes
    window.addEventListener("resize", handleResize); // Handle window resize

    return () => {
      unsubscribe(); // Clean up subscription
      window.removeEventListener("resize", handleResize); // Clean up resize listener
      if (throttleTimeout) clearTimeout(throttleTimeout); // Clean up throttle timeout
    };
  }, [handleResizeOrScroll, isScrolled, throttleTimeout]);

  return null;
}