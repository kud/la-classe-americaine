"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "card" | "image" | "button";
  lines?: number;
}

const LoadingSkeleton = ({ 
  className = "", 
  variant = "text",
  lines = 1 
}: LoadingSkeletonProps) => {
  const baseClasses = "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded animate-pulse";
  
  const variants = {
    text: "h-4 w-full",
    card: "h-48 w-full",
    image: "aspect-video w-full",
    button: "h-12 w-32"
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={`space-y-3 ${className}`}>
        {[...Array(lines)].map((_, i) => (
          <motion.div
            key={i}
            className={`${baseClasses} ${variants.text}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{ width: i === lines - 1 ? "80%" : "100%" }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="sr-only">Chargement en cours...</span>
    </motion.div>
  );
};

export default LoadingSkeleton;