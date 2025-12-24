import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChristmasMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked by browser, will require user interaction
        });
        setIsPlaying(true);
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
        style={{ display: "none" }}
      />

      {/* Music Control Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={toggleMute}
        className={cn(
          "fixed top-12 right-4 z-30 p-3 border-2 rounded-lg transition-all",
          "font-press text-xs uppercase",
          isMuted
            ? "bg-zinc-800 border-zinc-600 text-zinc-400 hover:bg-zinc-700"
            : "bg-primary border-primary-foreground text-primary-foreground hover:bg-primary/90 animate-pulse"
        )}
        title={isMuted ? "Click to enable Christmas music" : "Click to disable music"}
      >
        <motion.div
          animate={isPlaying && !isMuted ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          {isMuted ? (
            <>
              <VolumeX size={16} />
              <span>MUSIC OFF</span>
            </>
          ) : (
            <>
              <Volume2 size={16} />
              <span>MUSIC ON</span>
            </>
          )}
        </motion.div>
      </motion.button>
    </>
  );
}
