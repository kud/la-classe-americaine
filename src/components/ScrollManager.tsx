"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    // If not on homepage, enable scroll immediately
    if (pathname !== '/') {
      document.body.classList.add('scroll-enabled');
      document.documentElement.classList.add('scroll-enabled');
    } else {
      // On homepage, remove scroll-enabled class to let CinematicHero handle it
      document.body.classList.remove('scroll-enabled');
      document.documentElement.classList.remove('scroll-enabled');
    }

    return () => {
      // Cleanup function - don't remove scroll-enabled as other components might need it
    };
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollManager;