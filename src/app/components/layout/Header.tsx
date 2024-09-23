"use client";

import Container from "@/app/components/layout/Container";
import { useEffect, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import LogoColor from '@/app/assets/logo-color.svg';
import Image from 'next/image';

export default function Header() {
  const controls = useAnimation();
  const heightControls = useAnimation();
  const { scrollY } = useScroll();

  const logoRed = LogoColor;


  const scrollThreshold = 100;
  const animationDuration = 0.1;

  const isScrolled = useTransform(scrollY, [0, scrollThreshold], [false, true]);

  useEffect(() => {
    const unsubscribe = isScrolled.on("change", (scrolled) => {
      controls.start({
        y: scrolled ? -75 : 0,
        scale: scrolled ? 0.80 : 1,
      });

      heightControls.start({
        height: scrolled ? "80px" : "160px",
      });
    });

    return () => unsubscribe();
  }, [controls, isScrolled, heightControls]);

  return (
    <motion.header
      className="flex flex-col border-b border-custom-grey sticky top-0 bg-white z-50"
      animate={heightControls}
      transition={{ duration: animationDuration, ease: "easeOut" }}
    >
      <Container>
        {/* Top header row */}
        <div className="flex flex-row justify-between h-20">
          <div className="relative h-[90%] w-32 overflow-hidden ml-0">
            <Image
              src={logoRed}
              alt="logo"
              fill
              style={{ objectFit: 'cover' }}
              className="clip-path-custom"
            />
          </div>
        </div>


        <motion.div
          className="flex justify-center"
          animate={controls}
          transition={{ duration: animationDuration, ease: "easeOut" }}
        >
          <div className="shadow-custom border border-custom-grey rounded-[32px] w-full max-w-[860px] h-16 relative">

            <div className="md:hidden h-full flex flex-col px-7 justify-center">
              <b>Vart ska du?</b>
              <div className="flex flex-row space-x-2">
                <p className="dot-separator whitespace-nowrap text-ellipsis overflow-hidden ...">Vart som helst</p>
                <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Vilken vecka som helst</p>
                <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">När som helst</p>
              </div>

            </div>



            <div className="hidden md:flex md:items-center h-full ">
              <div className="flex-grow pr-5 pl-7 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex flex-col text-left justify-center">
                <b>Plats</b>
                <p>Sök destinationer</p>
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
