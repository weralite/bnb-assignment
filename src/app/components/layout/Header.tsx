"use client";
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import LogoColor from '@/app/assets/logo-color.svg';
import Image from 'next/image';
import HeaderAnimations from './HeaderAnimations';
import DesktopMenu from "../navigation/DesktopMenu";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();
  const heightControls = useAnimation();
  const logoRed = LogoColor;
  const animationDuration = 0.1;

  return (
    <motion.header
      className="border-b border-custom-grey sticky top-0 bg-white w-full"
      animate={heightControls}
      transition={{ duration: animationDuration, ease: "easeOut" }}
    >
      <HeaderAnimations controls={controls} heightControls={heightControls} onScrollChange={setScrolled} />

      <div className="px-5 md:px-10 lg:px-20 xl:px-30 2xl:px-40 w-full flex flex-col justify-center items-center">

        <div className="flex flex-row justify-between w-full h-20">
          <div className="hidden sm:block relative h-[90%] w-32 overflow-hidden ml-0">
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
          className="flex flex-row justify-center items-center w-full max-w-[860px]"
          animate={controls}
          transition={{ duration: animationDuration, ease: "easeOut" }}
        >
          <div className="shadow-custom border border-custom-grey rounded-[32px] w-full h-16 relative">

            <div className="1-md:hidden h-full flex flex-col px-7 justify-center">
              <b>Where are you going?</b>
              <div className="hidden 1-xs:flex flex-row space-x-2">
                <p className="dot-separator whitespace-nowrap text-ellipsis overflow-hidden ...">Anywhere</p>
                <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Anytime</p>
                <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Guests</p>
              </div>
              <div className="1-xs:hidden flex flex-row space-x-2">
                <p className="dot-separator whitespace-nowrap text-ellipsis overflow-hidden ...">Anywhere</p>
                <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Anytime</p>
                <p className="hidden xxs:block dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Guests</p>
              </div>

              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
              </div>
            </div>


            {scrolled ? (
              <div className="hidden 1-md:flex flex-col h-full px-7 justify-center">
                <div className="flex flex-row justify-center space-x-2 pr-5">
                  <b className="text-xl pr-6 grey whitespace-nowrap overflow-hidden text-ellipsis">Anywhere</b>
                  <b className="text-xl border-l pl-6 pr-6 border-custom-grey whitespace-nowrap overflow-hidden text-ellipsis">Anytime</b>
                  <b className="text-xl border-l pl-6 pr-6 border-custom-grey whitespace-nowrap overflow-hidden text-ellipsis">Guests</b>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
                </div>
              </div>
            ) : (
              <div className="hidden 1-md:flex md:items-center h-full">
                {/* Content for non-scrolled state */}
                <div className="flex-grow pr-5 pl-7 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full flex flex-col text-left justify-center">
                  <b>Where</b>
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">Search destinations</p>
                </div>
                <div className="flex-grow-0.5 border-l border-custom-grey pl-6 pr-6 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center">
                  <div>
                    <b>Check in</b>
                    <p>Add dates</p>
                  </div>
                </div>
                <div className="flex-grow-0.5 border-l border-custom-grey pl-6 pr-6 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center">
                  <div>
                    <b>Check out</b>
                    <p>Add dates</p>
                  </div>
                </div>
                <div className="flex-grow pr-15 pl-6 border-l border-custom-grey hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center relative">
                  <div>
                    <b>Who</b>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">Add guests</p>
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
