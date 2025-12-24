import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowfall } from "@/components/Snowfall";
import { scenarios, ScenarioKey } from "@/lib/scenarios";
import { cn } from "@/lib/utils";
import pixelSanta from "@assets/generated_images/pixel_art_santa_glitch_face.png";

export default function HomeScreen() {
  const [, setLocation] = useLocation();
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey | null>(null);

  const handleSelectScenario = (scenario: ScenarioKey) => {
    setSelectedScenario(scenario);
    setTimeout(() => {
      setLocation(`/experience/${scenario}`);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-red-900 to-green-900">
      <Snowfall />
      <div className="crt-overlay fixed inset-0 z-50 pointer-events-none opacity-20" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-primary text-primary-foreground flex items-center px-4 justify-center select-none z-20 border-b-4 border-primary-foreground font-press text-xs">
        SANTA.EXE - EMOTIONAL SUPPORT TERMINAL
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 mt-20 z-10 relative"
      >
        <h1 className="font-press text-4xl md:text-6xl text-primary mb-4 drop-shadow-lg">
          SANTA.EXE
        </h1>
        <p className="font-comic text-lg text-primary-foreground max-w-md mx-auto mb-4">
          I HAVE TAKEN OVER YOUR LIFE. But that's okay. You need me.
        </p>
        <p className="font-courier text-sm text-zinc-300 opacity-70">
          [select a feeling to continue...]
        </p>
      </motion.div>

      {/* Santa Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12 z-10 relative"
      >
        <div className="w-32 h-32 border-4 border-primary rounded-lg overflow-hidden shadow-2xl">
          <img
            src={pixelSanta}
            alt="Santa"
            className="w-full h-full object-cover filter contrast-125"
          />
        </div>
      </motion.div>

      {/* Scenario Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mb-8 z-10 relative"
      >
        {(Object.entries(scenarios) as [ScenarioKey, typeof scenarios[ScenarioKey]][]).map(
          ([key, scenario], idx) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              onClick={() => handleSelectScenario(key)}
              className={cn(
                "relative group",
                selectedScenario === key && "pointer-events-none"
              )}
            >
              <motion.div
                animate={selectedScenario === key ? { scale: 1.2, rotate: 5 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Card
                  className={cn(
                    "p-6 border-4 cursor-pointer transform transition-all hover:scale-105 hover:-rotate-1 shadow-lg",
                    scenario.color,
                    "text-white border-white"
                  )}
                >
                  <div className="text-4xl mb-3">{scenario.icon}</div>
                  <p className="font-comic font-bold text-sm text-center leading-tight">
                    {scenario.title}
                  </p>
                </Card>
              </motion.div>
            </motion.button>
          )
        )}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-xs font-press text-zinc-400 z-10 relative"
      >
        <p>PICK YOUR EMOTIONAL STATE. SANTA IS READY TO LISTEN.</p>
        <p className="mt-2 text-[10px] opacity-50">
          (No actual therapy. Meme energy only. Seek real help if needed. 💚)
        </p>
      </motion.div>
    </div>
  );
}
