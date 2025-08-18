"use client";

import useKeyboardNavigation from "@/hooks/useKeyboardNavigation";
import { useEffect, useState } from "react";

const KeyboardNavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [showHelp, setShowHelp] = useState(false);
  
  useKeyboardNavigation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show/hide keyboard shortcuts help
      if (e.key === "?" && e.shiftKey) {
        e.preventDefault();
        setShowHelp(!showHelp);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showHelp]);

  return (
    <>
      {children}
      
      {/* Keyboard shortcuts help modal */}
      {showHelp && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-label="Raccourcis clavier"
        >
          <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full border border-amber-500/30 shadow-professional-lg">
            <h2 className="text-2xl font-headline text-amber-400 mb-6">Raccourcis Clavier</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-newspaper text-amber-300 mb-3">Navigation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><kbd className="bg-gray-800 px-2 py-1 rounded text-amber-400">Alt + H</kbd> - Accueil</li>
                  <li><kbd className="bg-gray-800 px-2 py-1 rounded text-amber-400">Alt + F</kbd> - Film</li>
                  <li><kbd className="bg-gray-800 px-2 py-1 rounded text-amber-400">Alt + A</kbd> - À propos</li>
                  <li><kbd className="bg-gray-800 px-2 py-1 rounded text-amber-400">Alt + B</kbd> - Bonus</li>
                  <li><kbd className="bg-gray-800 px-2 py-1 rounded text-amber-400">Alt + D</kbd> - Téléchargement</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-newspaper text-amber-300 mb-3">Actions</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><kbd className="bg-gray-800 px-2 py-1 rounded text-amber-400">Alt + M</kbd> - Aller au contenu</li>
                  <li><kbd className="bg-gray-800 px-2 py-1 rounded text-amber-400">Esc</kbd> - Fermer</li>
                  <li><kbd className="bg-gray-800 px-2 py-1 rounded text-amber-400">Tab</kbd> - Navigation au clavier</li>
                  <li><kbd className="bg-gray-800 px-2 py-1 rounded text-amber-400">?</kbd> - Afficher cette aide</li>
                </ul>
              </div>
            </div>
            
            <button
              onClick={() => setShowHelp(false)}
              className="mt-8 bg-amber-600 hover:bg-amber-700 text-black font-bold px-6 py-3 rounded-lg transition-colors focus-visible-ring"
              aria-label="Fermer l'aide des raccourcis clavier"
            >
              Fermer (Esc)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyboardNavigationProvider;