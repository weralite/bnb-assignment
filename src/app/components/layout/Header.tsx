"use client";

import Container from "@/app/components/layout/Container";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

import LogoColor from '@/app/assets/logo-color.svg';
import Image from 'next/image';

export default function Header() {
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

  const logoRed = LogoColor;

  const scrollThreshold = 0.2; // When to trigger the animations
  const animationDuration = 0.2; // Duration for the animations

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const isScrolled = scrollY > scrollThreshold;

      if (isScrolled !== scrolled) {
        setScrolled(isScrolled); // Update scroll state

        if (isScrolled) {
          controls.start({
            y: -75, // Moves the bottom row up
            scale: 0.85, // Shrinks the row
          });
        } else {
          controls.start({
            y: 0,
            scale: 1,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, scrolled]);

  return (
    <motion.header
      className="flex flex-col border-b border-custom-grey sticky top-0 bg-white z-50"
      initial={{ height: "200px" }} // Initial full header height
      animate={{ height: scrolled ? "80px" : "200px" }} // Adjust only header height on scroll
      transition={{ duration: animationDuration, ease: "easeOut" }} // Unified transition settings
    >
      <Container>
        {/* Top header row */}
        <div className="flex flex-row justify-between h-20">
        <div className="relative h-[90%] w-32 overflow-hidden ml-0"> {/* Adjust the height and width for the parent container */}
            <Image
              src={logoRed}
              alt="logo"
              fill // Use fill attribute to make the image fill the parent container
              style={{ objectFit: 'cover' }} // Ensure the image covers the entire container
              className="clip-path-custom" // Apply custom clip-path
            />
          </div>
        </div>

        {/* Bottom row */}
        <motion.div
          className="flex justify-center"
          animate={controls}
          transition={{ duration: animationDuration, ease: "easeOut" }} // Same transition settings
        >
          <div className="shadow-custom border border-custom-grey rounded-[32px] min-w-[860px] max-w-[860px] h-16 relative">
            <div className="flex items-center h-full">

              {/* Adjust contents based on scroll state */}
              <div className="flex-grow pr-5 pl-7 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex flex-col text-left justify-center">
                <b>
                  {scrolled ? 'Plats' : 'Var'} {/* Change text on scroll */}
                </b>
                <p>
                  {scrolled ? 'Destination Vald' : 'Sök Destinationer'} {/* Change text on scroll */}
                </p>
              </div>

              <div className="flex-grow-0.5 border-l border-custom-grey pl-6 pr-6 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center">
                <div>
                  <b>Incheckning</b>
                  <p>Ange datum</p>
                </div>
              </div>

              <div className="flex-grow-0.5 border-l border-custom-grey pl-6 pr-6 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center">
                <div>
                  <b>Utcheckning</b>
                  <p>Ange datum</p>
                </div>
              </div>

              <div className="flex-grow pr-15 pl-6 border-l border-custom-grey hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center relative">
                <div>
                  <b>Vem</b>
                  <p>Lägg till gäster</p>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </Container>
    </motion.header>
  );
}
