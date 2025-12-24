import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const cookieSantaComments = [
  "THAT'S MY CHILD!",
  "SLOW DOWN.",
  "...are you okay?",
  "THIS IS YOUR COPING MECHANISM?",
  "I'M WATCHING YOU.",
  "THOSE ARE FOR SANTA.",
  "OKAY THAT'S ENOUGH.",
  "WHY ARE YOU LIKE THIS?",
  "IMPRESSIVE SPEED.",
];

export function CookieClicker() {
  const [cookies, setCookies] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [message, setMessage] = useState("CLICK THE COOKIE!");
  const [isExpanded, setIsExpanded] = useState(false);
  const [messageIdx, setMessageIdx] = useState(0);

  const handleCookieClick = () => {
    setCookies((prev) => prev + clickPower);
    
    // Santa reacts based on click rate
    const newIdx = Math.floor(Math.random() * cookieSantaComments.length);
    setMessage(cookieSantaComments[newIdx]);
  };

  // Upgrade: Double Click Power
  const buyPowerUp = () => {
    if (cookies >= 50) {
      setCookies((prev) => prev - 50);
      setClickPower((prev) => prev * 2);
      setMessage("NOW THAT'S THE SPIRIT!");
    }
  };

  // Auto-clicker upgrade
  const buyAutoClick = () => {
    if (cookies >= 200) {
      setCookies((prev) => prev - 200);
      // Start auto-clicking
      const interval = setInterval(() => {
        setCookies((prev) => prev + clickPower / 2);
      }, 1000);
      setMessage("ELVES ARE HELPING NOW!");
      return () => clearInterval(interval);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-4 right-4 z-20"
    >
      <Card
        className={cn(
          "border-4 border-primary bg-zinc-900/90 backdrop-blur-sm shadow-2xl transition-all duration-300",
          isExpanded ? "w-80" : "w-24"
        )}
      >
        <div className="p-4">
          {/* Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-center mb-3 font-press text-xs text-primary hover:text-primary-foreground transition-colors uppercase"
          >
            {isExpanded ? "CLOSE GAME" : "GAMING ZONE"}
          </button>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Santa Comment */}
              <div className="bg-card text-card-foreground border-2 border-card-foreground p-2 rounded min-h-12 font-comic text-xs text-center flex items-center justify-center">
                {message}
              </div>

              {/* Cookie Counter */}
              <div className="text-center">
                <p className="font-press text-xs text-primary mb-2">COOKIES: {cookies}</p>
                <p className="font-courier text-[10px] text-zinc-400">
                  Power: +{clickPower} per click
                </p>
              </div>

              {/* Big Cookie Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCookieClick}
                className="w-full aspect-square bg-amber-700 border-4 border-amber-600 rounded-lg text-6xl font-bold shadow-lg hover:bg-amber-600 transition-colors flex items-center justify-center"
              >
                🍪
              </motion.button>

              {/* Upgrades */}
              <div className="space-y-2">
                <button
                  onClick={buyPowerUp}
                  disabled={cookies < 50}
                  className={cn(
                    "w-full py-2 px-3 text-xs font-press border-2 rounded transition-colors",
                    cookies >= 50
                      ? "bg-primary text-primary-foreground border-primary-foreground hover:bg-primary/90 cursor-pointer"
                      : "bg-zinc-800 text-zinc-600 border-zinc-700 cursor-not-allowed opacity-50"
                  )}
                >
                  2X POWER (50 🍪)
                </button>
                <button
                  onClick={buyAutoClick}
                  disabled={cookies < 200}
                  className={cn(
                    "w-full py-2 px-3 text-xs font-press border-2 rounded transition-colors",
                    cookies >= 200
                      ? "bg-secondary text-secondary-foreground border-primary hover:bg-secondary/90 cursor-pointer"
                      : "bg-zinc-800 text-zinc-600 border-zinc-700 cursor-not-allowed opacity-50"
                  )}
                >
                  ELF HELPER (200 🍪)
                </button>
              </div>

              {/* Achievement */}
              {cookies > 1000 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-destructive/20 border-2 border-destructive text-destructive p-2 rounded text-center font-comic text-xs"
                >
                  🎄 SANTA IS IMPRESSED 🎄
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
