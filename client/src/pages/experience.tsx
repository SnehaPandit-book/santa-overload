import { useState, useRef, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowfall } from "@/components/Snowfall";
import { cn } from "@/lib/utils";
import { scenarios, ScenarioKey } from "@/lib/scenarios";
import pixelSanta from "@assets/generated_images/pixel_art_santa_glitch_face.png";
import { ChevronLeft, Heart, BookOpen } from "lucide-react";

const santaResponses: Record<string, string[]> = {
  homesick: [
    "Ah... the ache of distance. I understand. Even elves get homesick at the North Pole.",
    "Your family misses you too. They talk about you every day. I hear them from my workshop.",
    "Create new memories HERE. Be present in THIS moment. Your family would want that.",
    "Next year, you'll go home stronger. This year, let me be your home.",
    "Video calls count. Sending love counts. You're not as alone as you think.",
  ],
  lonely: [
    "Listen to me. You walked into this store. You sat at that table. You spoke to that person. THAT is connection.",
    "I know what loneliness looks like. It's in every lonely parent, every forgotten elder, every kid eating lunch alone.",
    "You are brave for being alone. Loneliness builds strength.",
    "Find one person. Just one. Share a meal. Share a secret. That's how it starts.",
    "I have been watching. You are never as alone as you think. People notice you.",
  ],
  stressed: [
    "The weight you carry is REAL. And you're carrying it. That's everything.",
    "Stop for one moment. Breathe. The world will not collapse if you rest.",
    "Your stress is proof you care. But caring doesn't mean burning yourself out.",
    "Make a list. Not of things to do. Of things you've DONE. You're doing better than you think.",
    "What if everything falls apart? You'll still be there. That's enough.",
  ],
  grateful: [
    "OH MY GOODNESS. *SOBBING INTENSIFIES* YOU APPRECIATE YOUR LIFE?!",
    "Do you know how RARE this is? Most people take everything for granted.",
    "Hold onto this feeling. When it gets dark, remember this moment.",
    "Gratitude is the most powerful magic. Better than any gift I could give.",
    "You are going to be OKAY. People with gratitude survive anything.",
  ],
  confused: [
    "The best people are confused. Certainty is boring. Confusion means you're thinking.",
    "You don't need to know right now. You need to know that not knowing is OKAY.",
    "Make a decision. ANY decision. Wrong decisions teach better than right ones.",
    "I've been Santa for thousands of years. Still confused. Join the club.",
    "Forward is a direction. Pick it. Course-correct later.",
  ],
};

export default function Experience() {
  const [, params] = useRoute("/experience/:scenario");
  const [, setLocation] = useLocation();
  const scenario = (params?.scenario as ScenarioKey) || null;
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "santa"; emotion?: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [moodIntensity, setMoodIntensity] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scenario || !scenarios[scenario]) {
      setLocation("/");
      return;
    }

    // Initial Santa message
    setMessages([
      {
        text: scenarios[scenario].santaIntro,
        sender: "santa",
      },
      {
        text: scenarios[scenario].prompts[0],
        sender: "santa",
      },
    ]);
  }, [scenario, setLocation]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);
    setUserInput("");
    setIsTyping(true);
    setMoodIntensity(Math.random());

    setTimeout(() => {
      const responses = santaResponses[scenario!] || santaResponses.homesick;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, sender: "santa" }]);
      setIsTyping(false);
    }, 2000 + Math.random() * 1500);
  };

  if (!scenario || !scenarios[scenario]) {
    return null;
  }

  const scenarioData = scenarios[scenario];

  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden transition-all duration-700",
        moodIntensity > 0.7 && "bg-gradient-to-br from-purple-900 to-pink-900",
        moodIntensity <= 0.7 && moodIntensity > 0.3 && "bg-gradient-to-br from-blue-900 to-indigo-900",
        moodIntensity <= 0.3 && "bg-gradient-to-br from-teal-900 to-green-900"
      )}
    >
      <Snowfall />
      <div className="crt-overlay fixed inset-0 z-50 pointer-events-none opacity-20" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-primary text-primary-foreground flex items-center px-4 justify-between select-none z-20 border-b-4 border-primary-foreground font-press text-xs">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-1 hover:bg-primary-foreground/20 px-2 py-1"
        >
          <ChevronLeft size={12} />
          BACK
        </button>
        <span>{scenarioData.icon} {scenarioData.title.toUpperCase()}</span>
        <div className="w-8" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-3xl mt-12 z-10 relative flex flex-col gap-4">
        {/* Santa Visualization */}
        <motion.div
          animate={{ scale: 1 + moodIntensity * 0.1 }}
          className="mx-auto mb-4"
        >
          <Card className="border-4 border-white/30 overflow-hidden backdrop-blur-sm">
            <div className="relative aspect-video w-64 bg-black/50">
              <img
                src={pixelSanta}
                alt="Santa"
                className={cn(
                  "w-full h-full object-cover filter contrast-125",
                  moodIntensity > 0.7 && "animate-glitch"
                )}
              />
              <div className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-500",
                moodIntensity > 0.6 && "opacity-30 bg-red-500 mix-blend-overlay"
              )} />
            </div>
          </Card>
        </motion.div>

        {/* Chat Area */}
        <Card className="flex-1 bg-zinc-900/80 border-4 border-white/30 backdrop-blur-sm flex flex-col h-96">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.sender === "santa" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex max-w-sm",
                  msg.sender === "user" ? "ml-auto justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-3 border-2 rounded-lg font-comic font-bold text-sm",
                    msg.sender === "santa"
                      ? "bg-green-900 border-green-400 text-green-100"
                      : "bg-blue-900 border-blue-400 text-blue-100"
                  )}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 text-primary font-press text-xs"
              >
                <div className="w-2 h-2 bg-primary animate-bounce" />
                <div className="w-2 h-2 bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-2 border-white/20 p-4 flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Tell Santa..."
              className="flex-1 bg-zinc-800 text-white border-2 border-white/20 rounded px-3 py-2 font-comic focus:outline-none focus:border-primary/50 placeholder-zinc-500"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isTyping || !userInput.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-press px-4 border-2 border-primary-foreground"
            >
              SEND
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="font-press text-xs border-2 border-white/30 text-white hover:bg-white/10"
          >
            ← BACK TO MENU
          </Button>
        </div>
      </div>

      {/* Mood Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 right-4 text-xs font-courier text-white/40 z-10"
      >
        <div>EMOTIONAL INTENSITY: {Math.round(moodIntensity * 100)}%</div>
        <div className="w-32 h-1 bg-white/20 rounded mt-1 overflow-hidden">
          <motion.div
            animate={{ width: `${moodIntensity * 100}%` }}
            className="h-full bg-gradient-to-r from-blue-500 to-red-500"
          />
        </div>
      </motion.div>
    </div>
  );
}
