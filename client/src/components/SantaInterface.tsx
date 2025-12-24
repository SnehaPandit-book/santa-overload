import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { santaResponses } from "@/lib/santa-data";
import { Snowfall } from "@/components/Snowfall";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import pixelSanta from "@assets/generated_images/pixel_art_santa_glitch_face.png";
import { AlertCircle, Terminal, Heart, Skull, Gift, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SantaInterface() {
  const [messages, setMessages] = useState<{ text: string; sender: 'santa' | 'user' }[]>([
    { text: "SANTA.EXE INITIALIZED...", sender: 'santa' },
    { text: "SCANNING FOR EMOTIONAL VULNERABILITY...", sender: 'santa' },
    { text: "SUBJECT IDENTIFIED: LONELY STUDENT.", sender: 'santa' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Random Error Popup Effect
  useEffect(() => {
    const errorInterval = setInterval(() => {
      if (Math.random() > 0.85) { // 15% chance every 10 seconds
        const errors = [
          "ERROR: Christmas spirit not found.",
          "WARNING: Emotional capacity exceeded.",
          "CRITICAL: Too much cynicism detected.",
          "SYSTEM: Reindeer.exe has stopped working.",
          "ALERT: You are on the Naughty List. Retrying...",
        ];
        toast({
          variant: "destructive",
          title: "SANTA.EXE SYSTEM ALERT",
          description: errors[Math.floor(Math.random() * errors.length)],
          duration: 3000,
        });
        triggerGlitch();
      }
    }, 10000);

    return () => clearInterval(errorInterval);
  }, [toast]);

  const addMessage = (text: string, sender: 'santa' | 'user') => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSantaResponse = (category: keyof typeof santaResponses) => {
    setIsTyping(true);
    
    // Simulate thinking delay
    setTimeout(() => {
      const options = santaResponses[category];
      const randomResponse = options[Math.floor(Math.random() * options.length)];
      
      setIsTyping(false);
      addMessage(randomResponse, 'santa');
      
      // Random glitch effect
      if (Math.random() > 0.7) {
        triggerGlitch();
      }
    }, 1500 + Math.random() * 1000);
  };

  const triggerGlitch = () => {
    setGlitchIntensity(1);
    setTimeout(() => setGlitchIntensity(0), 500);
  };

  const handleUserAction = (action: string, category: keyof typeof santaResponses) => {
    addMessage(action, 'user');
    handleSantaResponse(category);
  };

  const ActionButton = ({ 
    label, 
    action, 
    category, 
    icon: Icon,
    variant = "default" 
  }: { 
    label: string, 
    action: string, 
    category: keyof typeof santaResponses,
    icon: any,
    variant?: "default" | "destructive" | "secondary" | "outline"
  }) => (
    <Button
      variant={variant}
      className={cn(
        "h-auto py-4 px-2 text-xs md:text-sm font-bold uppercase tracking-widest border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-normal text-center flex flex-col items-center gap-2",
        variant === "destructive" && "bg-destructive text-destructive-foreground border-destructive-foreground hover:bg-destructive/90",
        variant === "secondary" && "bg-secondary text-secondary-foreground border-primary hover:bg-secondary/90",
        variant === "default" && "bg-primary text-primary-foreground border-primary-foreground hover:bg-primary/90",
        "font-press"
      )}
      onClick={() => handleUserAction(action, category)}
    >
      <Icon className="w-6 h-6 mb-1" />
      {label}
    </Button>
  );

  return (
    <div className={cn("min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden", glitchIntensity > 0 && "animate-glitch")}>
      <Snowfall />
      
      {/* CRT Overlay */}
      <div className="crt-overlay fixed inset-0 z-50 pointer-events-none opacity-20" />

      {/* Main Container */}
      <Card className="w-full max-w-5xl bg-zinc-900 border-4 border-primary shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row h-[85vh] md:h-[800px]">
        
        {/* Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-primary text-primary-foreground flex items-center px-4 justify-between select-none z-20 border-b-4 border-primary-foreground">
          <div className="flex items-center gap-2 font-press text-xs">
            <Terminal size={14} />
            <span>SANTA.EXE - UNACTIVATED COPY</span>
          </div>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-primary-foreground opacity-50" />
            <div className="w-4 h-4 bg-primary-foreground opacity-50" />
            <div className="w-4 h-4 bg-destructive cursor-pointer hover:bg-red-500" onClick={() => {
              toast({ title: "NICE TRY.", description: "THERE IS NO ESCAPE." });
              triggerGlitch();
            }} />
          </div>
        </div>

        {/* Left Column: Visuals */}
        <div className="md:w-1/3 bg-black border-b-4 md:border-b-0 md:border-r-4 border-primary p-4 flex flex-col gap-4 pt-12">
          
          {/* Santa Image */}
          <div className="relative aspect-square w-full border-2 border-zinc-700 overflow-hidden bg-zinc-800 group">
            <img 
              src={pixelSanta} 
              alt="Santa" 
              className={cn(
                "w-full h-full object-cover filter contrast-125 hover:scale-110 transition-transform duration-700",
                isTyping && "animate-pulse"
              )} 
            />
            {isTyping && (
              <div className="absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 text-[10px] font-press animate-bounce">
                WRITING...
              </div>
            )}
            <div className="absolute inset-0 bg-green-900/20 pointer-events-none mix-blend-overlay" />
          </div>

          {/* System Status */}
          <div className="bg-zinc-950 p-4 border border-zinc-800 flex-1 font-courier text-green-500 text-xs overflow-hidden flex flex-col">
             <div className="mb-2 uppercase border-b border-green-900 pb-1">System Logs:</div>
             <div className="flex-1 overflow-y-auto space-y-1 opacity-80">
               <p>{">"} CONNECTED TO LOCALHOST</p>
               <p>{">"} FAMILY_EMULATION_MODULE: ACTIVE</p>
               <p>{">"} JUDGMENT_LEVEL: MAX</p>
               <p>{">"} COOKIE_REQUEST: PENDING</p>
               {messages.length > 5 && <p>{">"} ANALYSIS: SUBJECT IS NEUROTIC</p>}
               {messages.length > 10 && <p>{">"} WARNING: CRINGE DETECTED</p>}
               {isTyping && <p className="animate-pulse">{">"} GENERATING ROAST...</p>}
             </div>
          </div>
        </div>

        {/* Right Column: Chat & Interaction */}
        <div className="flex-1 flex flex-col pt-12 bg-zinc-900">
          
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.sender === 'santa' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex flex-col max-w-[85%]",
                  msg.sender === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div className={cn(
                  "px-4 py-3 border-2 text-sm md:text-base font-comic font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]",
                  msg.sender === 'santa' 
                    ? "bg-card text-card-foreground border-card-foreground rounded-tr-lg rounded-br-lg rounded-bl-lg" 
                    : "bg-muted text-muted-foreground border-muted-foreground rounded-tl-lg rounded-bl-lg rounded-br-lg"
                )}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 uppercase font-press px-1">
                  {msg.sender === 'santa' ? 'SANTA.EXE' : 'USER'}
                </span>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-primary font-press text-xs"
              >
                <div className="w-2 h-2 bg-primary animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="w-2 h-2 bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Controls Area */}
          <div className="p-4 bg-zinc-950 border-t-4 border-primary grid grid-cols-2 md:grid-cols-3 gap-3">
            <ActionButton 
              label="I'm Not Going Home" 
              action="Santa, I'm not going home this year..." 
              category="notGoingHome"
              icon={Skull}
              variant="destructive"
            />
            <ActionButton 
              label="Scold Me Like Mom" 
              action="I need discipline, Santa." 
              category="scold"
              icon={AlertCircle}
            />
             <ActionButton 
              label="Encourage Me Like Dad" 
              action="I'm trying my best..." 
              category="encourage"
              icon={Heart}
            />
             <ActionButton 
              label="Unqualified Life Advice" 
              action="Tell me how to live my life." 
              category="advice"
              icon={Terminal}
              variant="secondary"
            />
             <ActionButton 
              label="Worst Christmas Gift" 
              action="Give me something terrible." 
              category="worstGift"
              icon={Gift}
            />
             <ActionButton 
              label="Santa, Surprise Me (Bad Idea)" 
              action="Do something weird." 
              category="surprise"
              icon={MessageCircle}
              variant="outline"
            />
             <ActionButton 
              label="Santa Overreacts Dramatically" 
              action="Why are you like this?" 
              category="dramatic"
              icon={AlertCircle}
            />
             <div className="col-span-1 md:col-span-2">
                <Button 
                  className="w-full h-full font-press text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border-2 border-zinc-600 uppercase"
                  onClick={() => {
                    addMessage("Please let me go.", 'user');
                    handleSantaResponse("goodbye");
                    toast({ title: "NICE TRY.", description: "SANTA LOVES YOU TOO MUCH TO LET GO." });
                  }}
                >
                  RELEASE ME FROM SANTA'S CARE
                </Button>
             </div>
          </div>
        </div>
      </Card>

      <div className="fixed bottom-2 right-2 text-[10px] text-white/20 font-press select-none">
        v1.0.0_ALPHA_CURSED
      </div>
    </div>
  );
}
