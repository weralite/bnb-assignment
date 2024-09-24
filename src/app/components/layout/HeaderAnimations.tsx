import { useEffect, useState } from 'react';
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
  const [throttleTimeout, setThrottleTimeout] = useState<NodeJS.Timeout | null>(null); // Track timeout

console.log(isScrolled.get());

  useEffect(() => {
    const handleResizeOrScroll = () => {
      const isMobile = window.innerWidth <= 639;
      const scrolled = isScrolled.get();

      // Update only if the scroll state has changed
      if (scrolled !== lastScrolled) {
        // If a throttle timeout is already active, do not update
        if (throttleTimeout) return;

        setLastScrolled(scrolled);

        // Start animations
        controls.start({
          y: isMobile ? -75 : scrolled ? -75 : 0,
          scale: isMobile ? 1 : scrolled ? 0.8 : 1,
          width: isMobile ? "100%" : scrolled ? "70%" : "100%",
          maxWidth: isMobile ? "860px" : scrolled ? "600px" : "860px",
          transition: { duration: 0.3 }, // Control transition timing
        });

        heightControls.start({
          height: isMobile ? "80px" : (scrolled ? "80px" : "160px"),
          transition: { duration: 0.3 }, // Control transition timing
        });

        onScrollChange(scrolled);

        // Set a throttle timeout for 1 second
        const timeout = setTimeout(() => {
          setThrottleTimeout(null); // Clear the throttle timeout after 1 second
        }, 200);

        setThrottleTimeout(timeout); // Store the timeout ID
      }
    };

    handleResizeOrScroll(); // Initial call to set state based on current scroll position

    const unsubscribe = isScrolled.on("change", handleResizeOrScroll); // Subscribe to scroll changes
    window.addEventListener("resize", handleResizeOrScroll); // Handle window resize

    return () => {
      unsubscribe(); // Clean up subscription
      window.removeEventListener("resize", handleResizeOrScroll); // Clean up resize listener
      if (throttleTimeout) clearTimeout(throttleTimeout); // Clean up throttle timeout
    };
  }, [controls, isScrolled, heightControls, lastScrolled, throttleTimeout]);

  return null;
}
