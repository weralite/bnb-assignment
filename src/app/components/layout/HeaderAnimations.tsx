import { useEffect } from 'react';
import { useAnimation, useScroll, useTransform } from 'framer-motion';

interface HeaderAnimationsProps {
  controls: ReturnType<typeof useAnimation>;
  heightControls: ReturnType<typeof useAnimation>;
  onScrollChange: (scrolled: boolean) => void;
}

export default function HeaderAnimations({ controls, heightControls, onScrollChange }: HeaderAnimationsProps) {
  const { scrollY } = useScroll();
  const scrollThreshold = 100;
  const isScrolled = useTransform(scrollY, [0, scrollThreshold], [false, true]);

  useEffect(() => {
    const handleResizeOrScroll = () => {
      const isMobile = window.innerWidth <= 639;
      const scrolled = isScrolled.get();

      controls.start({
        y: isMobile ? -75 : scrolled ? -75 : 0,
        // x: isMobile ? 0 : scrolled ? 0 : 0,
        scale: isMobile ? 1 : scrolled ? 0.80 : 1,
        width: isMobile ? "100%" : scrolled ? "70%" : "100%",
        maxWidth: isMobile ? "100%" : scrolled ? "50%" : "90%",
      });

      heightControls.start({
        height: isMobile ? "80px" : (scrolled ? "80px" : "160px"),
      });

      onScrollChange(scrolled)
    };

    handleResizeOrScroll();

    const unsubscribe = isScrolled.on("change", handleResizeOrScroll);
    window.addEventListener("resize", handleResizeOrScroll);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResizeOrScroll);
    };
  }, [controls, isScrolled, heightControls]);

  return null; 
}
