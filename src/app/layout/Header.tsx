"use client";


import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HeaderAnimations from './HeaderAnimations';
import DesktopUserMenu from "@/components/navigation/DesktopUserMenu";
import MobileContent from "@/components/header/MobileContent";
import ScrolledContent from "@/components/header/ScrolledContent";
import NonScrolledContent from "@/components/header/NonScrolledContent";
import HeaderLogo from "@/components/header/HeaderLogo";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();
  const heightControls = useAnimation();
  const animationDuration = 0.1;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run on client
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const reverseAnimation = () => {
    if (scrolled && !isMobile) {
      setScrolled(false);
      controls.start({
        y: 0,
        scale: 1,
        width: "100%",
        maxWidth: "860px",
        transition: { duration: animationDuration },
      });

      heightControls.start({
        height: "160px",
        transition: { duration: animationDuration },
      });
    }
  }


  return (
    <motion.header
      className="border-b border-custom-grey sticky top-0 bg-white w-full h-[160px]"
      animate={heightControls}
      transition={{ duration: animationDuration, ease: "easeOut" }}
    >
      <HeaderAnimations isMobile={isMobile} controls={controls} heightControls={heightControls} onScrollChange={setScrolled} />

      <div className="px-5 md:px-10 lg:px-20 xl:px-30 2xl:px-40 w-full flex flex-col justify-center items-center">

        <div className="flex flex-row justify-between w-full h-20 py-2">
          <HeaderLogo />
          <DesktopUserMenu />
        </div>


        <motion.div
          className="flex flex-row justify-center items-center w-full max-w-[800px]"
          animate={controls}
          transition={{ duration: animationDuration, ease: "easeOut" }}
          onClick={() => reverseAnimation()}
        >
          <div className="shadow-custom border border-custom-grey rounded-[32px] w-full h-16 relative">

            {/* Mobile content */}

            <MobileContent />

            {/* Desktop content */}
            {scrolled ?

              <ScrolledContent /> : <NonScrolledContent />}

          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
