"use client";
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HeaderAnimations from './HeaderAnimations';
import DesktopUserMenu from "@/components/navigation/DesktopUserMenu";
import MobileContent from "@/components/common/MobileContent";
import ScrolledContent from "@/components/common/ScrolledContent";
import NonScrolledContent from "@/components/common/NonScrolledContent";
import HeaderLogo from "@/components/common/HeaderLogo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();
  const heightControls = useAnimation();
  const animationDuration = 0.1;

  return (
    <motion.header
      className="border-b border-custom-grey sticky top-0 bg-white w-full h-[160px]"
      animate={heightControls}
      transition={{ duration: animationDuration, ease: "easeOut" }}
    >
      <HeaderAnimations controls={controls} heightControls={heightControls} onScrollChange={setScrolled} />

      <div className="px-5 md:px-10 lg:px-20 xl:px-30 2xl:px-40 w-full flex flex-col justify-center items-center">

        <div className="flex flex-row justify-between w-full h-20 py-2">
          <HeaderLogo />
          <DesktopUserMenu />
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
