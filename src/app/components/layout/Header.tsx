"use client";

import Container from "@/app/components/layout/Container";
import { motion, useAnimation } from 'framer-motion';
import LogoColor from '@/app/assets/logo-color.svg';
import Image from 'next/image';
import HeaderAnimations from './HeaderAnimations';
import DesktopMenu from "../navigation/DesktopMenu";

export default function Header() {
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
      <HeaderAnimations controls={controls} heightControls={heightControls} />

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
          <div className="flex flex-row">
          <DesktopMenu />
          <DesktopMenu />
          <DesktopMenu />
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
        </div>


        <motion.div
          className="flex flex-row justify-center items-center w-860 max-w-[860px]"
          animate={controls}
          transition={{ duration: animationDuration, ease: "easeOut" }}
        >
          <div className="shadow-custom border border-custom-grey rounded-[32px] w-full h-16 relative">
            <div className="1-md:hidden h-full flex flex-col px-7 justify-center">
              <b>Vart ska du?</b>
              <div className="flex flex-row space-x-2">
                <p className="dot-separator whitespace-nowrap text-ellipsis overflow-hidden ...">Vart som helst</p>
                <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Vilken vecka som helst</p>
                <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">När som helst</p>
              </div>
              <div className="hidden 1-sm:block absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
              </div>
            </div>



            <div className="hidden 1-md:flex md:items-center h-full ">
              <div className="flex-grow pr-5 pl-7 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full flex flex-col text-left justify-center">
                <b>Plats</b>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">Sök destinationer</p>
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
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">Lägg till gäster</p>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
