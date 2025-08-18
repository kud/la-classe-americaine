"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useKeyboardNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input field
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Keyboard shortcuts
      switch (e.key) {
        // Navigation shortcuts
        case "h":
          if (e.altKey) {
            e.preventDefault();
            router.push("/");
          }
          break;
        case "f":
          if (e.altKey) {
            e.preventDefault();
            router.push("/film");
          }
          break;
        case "a":
          if (e.altKey) {
            e.preventDefault();
            router.push("/about");
          }
          break;
        case "b":
          if (e.altKey) {
            e.preventDefault();
            router.push("/bonus");
          }
          break;
        case "d":
          if (e.altKey) {
            e.preventDefault();
            router.push("/download");
          }
          break;
        
        // Accessibility shortcuts
        case "Escape":
          // Close any open modals or menus
          const closeButton = document.querySelector('[aria-label*="Fermer"]') as HTMLElement;
          if (closeButton) {
            closeButton.click();
          }
          break;
        
        case "/":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            // Focus search if available
            const searchInput = document.querySelector('input[type="search"]') as HTMLElement;
            if (searchInput) {
              searchInput.focus();
            }
          }
          break;
        
        // Skip to main content
        case "m":
          if (e.altKey) {
            e.preventDefault();
            const mainContent = document.getElementById("main-content");
            if (mainContent) {
              mainContent.focus();
              mainContent.scrollIntoView({ behavior: "smooth" });
            }
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
};

export default useKeyboardNavigation;