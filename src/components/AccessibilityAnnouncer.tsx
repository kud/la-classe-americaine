"use client";

import { useEffect, useState } from "react";

interface AccessibilityAnnouncerProps {
  message?: string;
  priority?: "polite" | "assertive";
}

const AccessibilityAnnouncer = ({ 
  message, 
  priority = "polite" 
}: AccessibilityAnnouncerProps) => {
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (message) {
      // Clear and reset to ensure screen readers announce
      setAnnouncement("");
      setTimeout(() => setAnnouncement(message), 100);
    }
  }, [message]);

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div 
        role="status" 
        aria-live={priority} 
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      
      {/* Additional region for important alerts */}
      <div 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
        className="sr-only"
        id="alert-region"
      />
    </>
  );
};

export default AccessibilityAnnouncer;