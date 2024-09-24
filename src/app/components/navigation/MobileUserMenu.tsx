"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

export default function MobileUserMenu() {
  const { scrollY } = useScroll(); // Track scroll position
  const [isVisible, setIsVisible] = useState(true); // Control menu visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Store last scroll position

  // Detect scroll direction and toggle menu visibility
  useMotionValueEvent(scrollY, "change", (currentScroll) => {
    if (currentScroll > lastScrollY && currentScroll > 50) {
      // Scrolling down, hide menu (move it down out of view)
      setIsVisible(false);
    } else {
      // Scrolling up, show menu (move it back up)
      setIsVisible(true);
    }
    setLastScrollY(currentScroll); // Update last scroll position
  });

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 100 }} // Show menu (y=0), hide (y=100 moves it down out of view)
      transition={{ duration: 0.3 }}
      className="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 z-50 w-full"
    >
      <ul className="flex justify-around">
        <li className="font-bold"><a href="/">Home</a></li>
        <li className="font-bold"><a href="/login">Login</a></li>
        <li className="font-bold"><a href="/register">Register</a></li>
      </ul>
    </motion.nav>
  );
}
