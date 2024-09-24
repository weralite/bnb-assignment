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

  console.log(isScrolled.get());

  useEffect(() => {
    const handleResizeOrScroll = () => {
      const isMobile = window.innerWidth <= 639;
      const scrolled = isScrolled.get();

      // Update only if the scroll state has changed
      if (scrolled !== lastScrolled) {
        setLastScrolled(scrolled);

        controls.start({
          y: isMobile ? -75 : scrolled ? -75 : 0,
          scale: isMobile ? 1 : scrolled ? 0.80 : 1,
          width: isMobile ? "100%" : scrolled ? "70%" : "100%",
          maxWidth: isMobile ? "860px" : scrolled ? "600px" : "860px",
          transition: { duration: 0.3 }, // Control transition timing
        });

        heightControls.start({
          height: isMobile ? "80px" : (scrolled ? "80px" : "160px"),
          transition: { duration: 0.3 }, // Control transition timing
        });

        onScrollChange(scrolled);
      }
    };

    handleResizeOrScroll();

    const unsubscribe = isScrolled.on("change", handleResizeOrScroll);
    window.addEventListener("resize", handleResizeOrScroll);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResizeOrScroll);
    };
  }, [controls, isScrolled, heightControls, lastScrolled]);

  return null;
}