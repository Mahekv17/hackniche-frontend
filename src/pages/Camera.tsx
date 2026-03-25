import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Zap, Image, Crosshair, Wifi, AlertTriangle, Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";

const CameraPage = () => {
  const navigate = useNavigate();
  const { captureHazard } = useGameStore();
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    captureHazard();
    setCaptured(true);
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        <motion.button
          onClick={() => navigate(-1)}
          className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-foreground" />
        </motion.button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-destructive animate-soft-pulse" />
          <span className="text-xs md:text-sm font-semibold text-destructive">Live Feed 🔴</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground">4G</span>
        </div>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 relative mx-4 md:mx-8 my-2">
        <div className="absolute inset-0 rounded-2xl bg-secondary/20 border border-border/20 overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(var(--primary)/0.08) 3px, hsl(var(--primary)/0.08) 5px)",
            }}
          />
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Corner Brackets */}
        <div className="absolute top-5 left-5 w-10 h-10 md:w-12 md:h-12 border-l-2 border-t-2 border-primary/60 rounded-tl-lg" />
        <div className="absolute top-5 right-5 w-10 h-10 md:w-12 md:h-12 border-r-2 border-t-2 border-primary/60 rounded-tr-lg" />
        <div className="absolute bottom-5 left-5 w-10 h-10 md:w-12 md:h-12 border-l-2 border-b-2 border-primary/60 rounded-bl-lg" />
        <div className="absolute bottom-5 right-5 w-10 h-10 md:w-12 md:h-12 border-r-2 border-b-2 border-primary/60 rounded-br-lg" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Crosshair className="w-12 h-12 md:w-14 md:h-14 text-primary/20" />
        </div>

        {/* Header */}
        <div className="absolute top-7 left-0 right-0 text-center">
          <p className="font-display text-base md:text-lg text-primary text-glow">Hazard Bounty 🎯</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Point your camera at the hazard</p>
        </div>

        {/* Detection */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-xl bg-warning/10 border border-warning/25"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span className="text-xs md:text-sm font-semibold text-warning">Potential hazard spotted! 👀</span>
        </motion.div>

        {/* Capture Success */}
        <AnimatePresence>
          {captured && (
            <motion.div
              className="absolute inset-0 bg-primary/15 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 glow-green-strong">
                  <Check className="w-10 h-10 text-primary-foreground" />
                </div>
                <p className="font-display text-lg md:text-xl text-primary text-glow">Hazard Captured! 🎉</p>
                <p className="text-sm md:text-base text-foreground mt-2">+500 Safety Coins earned</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Telemetry */}
        <div className="absolute bottom-7 left-7 space-y-1">
          <p className="text-xs text-muted-foreground/60">ISO 3200 · f/1.8</p>
          <p className="text-xs text-muted-foreground/60">48MP · AI Detect</p>
        </div>

        <div className="absolute bottom-7 right-7">
          <p className="text-xs font-semibold text-primary">⏺ REC</p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-4 md:px-8 py-6 md:py-8 flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-secondary border border-border/30 overflow-hidden flex items-center justify-center">
          <Image className="w-5 h-5 text-muted-foreground" />
        </div>

        <Button
          onClick={handleCapture}
          disabled={captured}
          className="h-14 md:h-16 px-8 md:px-10 rounded-2xl bg-primary text-primary-foreground font-display text-sm md:text-base glow-green-strong hover:bg-primary/90 gap-2 disabled:opacity-50"
        >
          <Camera className="w-5 h-5" />
          Capture Hazard +500 pts
        </Button>

        <motion.button
          className="w-12 h-12 rounded-xl bg-secondary border border-border/30 flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
        >
          <Zap className="w-5 h-5 text-muted-foreground" />
        </motion.button>
      </div>
    </div>
  );
};

export default CameraPage;
