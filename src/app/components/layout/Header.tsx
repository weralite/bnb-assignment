"use client";
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HeaderAnimations from './HeaderAnimations';
import DesktopMenu from "../navigation/DesktopMenu";
import MobileContent from "./headerContent/MobileContent"
import ScrolledContent from './headerContent/ScrolledContent';
import NonScrolledContent from './headerContent/NonScrolledContent';
import HeaderLogo from './headerContent/HeaderLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();
  const heightControls = useAnimation();
  const animationDuration = 0.1;

  return (
    <motion.header
      className="border-b border-custom-grey sticky top-0 bg-white w-full"
      animate={heightControls}
      transition={{ duration: animationDuration, ease: "easeOut" }}
    >
      <HeaderAnimations controls={controls} heightControls={heightControls} onScrollChange={setScrolled} />

      <div className="px-5 md:px-10 lg:px-20 xl:px-30 2xl:px-40 w-full flex flex-col justify-center items-center">

        <div className="flex flex-row justify-between w-full h-20 py-2 pr-5">
          <HeaderLogo />
          <DesktopMenu />
        </div>


        <motion.div
          className="flex flex-row justify-center items-center w-full max-w-[860px]"
          animate={controls}
          transition={{ duration: animationDuration, ease: "easeOut" }}
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
