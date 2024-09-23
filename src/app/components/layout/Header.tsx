"use client";

import Container from "@/app/components/layout/Container";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 100) {
        setScrolled(true); // Activate the merged state
        controls.start({
          y: -80, // Moves the bottom row up
          scale: 0.85, // Shrinks the row
          opacity: 0.9, // Adjust opacity slightly
        });
      } else {
        setScrolled(false); // Reset the state
        controls.start({
          y: 0,
          scale: 1,
          opacity: 1,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <header className="flex flex-col border-b border-custom-grey pb-5 sticky top-0 bg-white z-50">
      <Container>
        {/* Top header row */}
        <div className="py-10 flex flex-row justify-between">
          <h1>hej</h1>
          <h1>hej</h1>
        </div>

        {/* Bottom row */}
        <motion.div
          className="flex justify-center"
          animate={controls}
          transition={{ duration: 0.3, ease: "easeOut" }}
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
                  <b>
                    Incheckning
                  </b>
                  <p>
                    Ange datum
                  </p>
                </div>
              </div>

              <div className="flex-grow-0.5 border-l border-custom-grey pl-6 pr-6 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center">
                <div>
                  <b>
                    Utcheckning
                  </b>
                  <p>
                    Ange datum
                  </p>
                </div>
              </div>

              <div className="flex-grow pr-15 pl-6 border-l border-custom-grey hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center relative">
                <div>
                  <b>
                    Vem
                  </b>
                  <p>
                    Lägg till gäster
                  </p>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </Container>
    </header>
  );
}
