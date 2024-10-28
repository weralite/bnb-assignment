"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

export default function MobileUserMenu() {
  const { scrollY } = useScroll(); 
  const [isVisible, setIsVisible] = useState(true); 
  const [lastScrollY, setLastScrollY] = useState(0); 

  useMotionValueEvent(scrollY, "change", (currentScroll) => {
    if (currentScroll > lastScrollY && currentScroll > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScroll); 
  });

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      className="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 z-50 w-full"
    >
      <ul className="flex justify-around">
        <li className="font-bold"><a href="/login">Login</a></li>
        <li className="font-bold"><a href="/register">Register</a></li>
      </ul>
    </motion.nav>
  );
}
