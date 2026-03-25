import { useState, useRef } from "react";
import { AlertTriangle, MapPin, Heart, Moon, Radio, Info, Shield, Snowflake } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/hooks/useGameStore";
import { toast } from "sonner";

const SOS = () => {
  const [activated, setActivated] = useState(false);
  const [cooldownRequested, setCooldownRequested] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const { activateSOS, deactivateSOS, requestCoolDown } = useGameStore();

  const thumbWidth = 56;

  const handleDragEnd = () => {
    const containerEl = constraintsRef.current;
    if (!containerEl) return;
    const containerWidth = containerEl.offsetWidth;
    const maxDrag = containerWidth - thumbWidth - 8;
    if (x.get() > maxDrag * 0.85) {
      setActivated(true);
      activateSOS();
    } else {
      x.set(0);
    }
  };

  const handleCancel = () => {
    setActivated(false);
    x.set(0);
    deactivateSOS();
  };

  const handleCoolDown = () => {
    setCooldownRequested(true);
    requestCoolDown();
    toast.success("Cool-down request sent! 😊", {
      description: "Your supervisor has been notified. Take a breather!",
    });
    setTimeout(() => setCooldownRequested(false), 5000);
  };

  const bgOpacity = useTransform(x, [0, 200], [0, 1]);

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 space-y-5 md:space-y-6">
      {/* System Status */}
      <div className="glass-card p-3.5 md:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 md:w-5 md:h-5 text-primary animate-soft-pulse" />
          <span className="text-xs md:text-sm text-primary font-semibold">System Ready ✅</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 md:w-4 md:h-4 text-muted-foreground" />
          <span className="text-xs md:text-sm text-muted-foreground">📍 High Precision</span>
        </div>
      </div>

      {/* Desktop: SOS + Vitals side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* ─── SOS Slider ─── */}
        <div className={`glass-card p-6 md:p-7 border ${activated ? "border-destructive/40 bg-destructive/5 glow-red" : "border-destructive/20"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl bg-destructive/15 border border-destructive/25 flex items-center justify-center">
              <AlertTriangle className={`w-5 h-5 md:w-6 md:h-6 text-destructive ${activated ? "animate-pulse" : ""}`} />
            </div>
            <div>
              <h2 className="font-display text-base md:text-lg text-foreground">Emergency SOS 🚨</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Slide to send a distress signal</p>
            </div>
          </div>

          {activated ? (
            <motion.div
              className="text-center py-8 md:py-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-destructive mx-auto mb-4" />
              </motion.div>
              <p className="font-display text-xl md:text-2xl text-destructive">SOS Activated!</p>
              <p className="text-sm md:text-base text-muted-foreground mt-2">Help is on the way · ETA 3 min 🏃</p>
              <p className="text-xs md:text-sm text-destructive/50 mt-1">📍 Coordinates shared</p>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="mt-5 text-xs md:text-sm font-semibold rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                Cancel Alert
              </Button>
            </motion.div>
          ) : (
            <div
              ref={constraintsRef}
              className="relative h-14 md:h-16 rounded-2xl bg-destructive/8 border border-destructive/20 overflow-hidden w-full"
            >
              <motion.div
                className="absolute inset-0 bg-destructive/20 rounded-2xl"
                style={{ opacity: bgOpacity }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.span
                  className="text-xs md:text-sm font-semibold text-destructive/40"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  Slide to SOS →→→
                </motion.span>
              </div>
              <motion.div
                className="absolute top-1 left-1 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-destructive flex items-center justify-center cursor-grab active:cursor-grabbing z-10 glow-red"
                drag="x"
                dragConstraints={constraintsRef}
                dragElastic={0}
                dragMomentum={false}
                style={{ x }}
                onDragEnd={handleDragEnd}
                whileHover={{ scale: 1.05 }}
              >
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-destructive-foreground" />
              </motion.div>
            </div>
          )}
        </div>

        {/* Vitals Column */}
        <div className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <motion.div className="glass-card p-4 md:p-5" whileHover={{ y: -1 }}>
              <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">Fatigue Level 😴</p>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl md:text-4xl text-warning">32</span>
                <span className="text-xs md:text-sm text-muted-foreground">/ 100</span>
              </div>
              <div className="w-full h-2 md:h-2.5 rounded-full bg-secondary overflow-hidden mt-2.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-warning"
                  initial={{ width: 0 }}
                  animate={{ width: "32%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs md:text-sm font-semibold text-primary mt-2">Looking good! 💪</p>
            </motion.div>

            <motion.div className="glass-card p-4 md:p-5" whileHover={{ y: -1 }}>
              <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">Heart Rate 💓</p>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-destructive animate-pulse" />
                <span className="font-display text-3xl md:text-4xl text-foreground">72</span>
                <span className="text-xs md:text-sm text-muted-foreground">bpm</span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-primary mt-2">All normal! ✅</p>
            </motion.div>
          </div>

          {/* ─── Cool-Down Button ─── */}
          <div className="glass-card p-5 md:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/4 to-cyan-500/4 pointer-events-none" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <Snowflake className="w-6 h-6 md:w-7 md:h-7 text-blue-400" />
              <div>
                <h3 className="font-display text-sm md:text-base text-foreground">Feeling Tired? 😮‍💨</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Request a supervised cool-down break</p>
              </div>
            </div>
            <Button
              onClick={handleCoolDown}
              disabled={cooldownRequested}
              className={`w-full font-semibold text-sm md:text-base rounded-xl h-12 md:h-14 gap-2 relative z-10 transition-all ${cooldownRequested
                  ? "bg-blue-500/15 text-blue-400 border border-blue-400/20"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-500/90 hover:to-cyan-500/90 glow-blue"
                }`}
            >
              {cooldownRequested ? (
                <>
                  <Shield className="w-5 h-5" />
                  Request Sent! Hang Tight 🫡
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  Request 10-Min Cool-Down ❄️
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2.5 px-2">
        <Info className="w-4 h-4 md:w-4 md:h-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs md:text-sm text-muted-foreground/50 leading-relaxed">
          Emergency protocol compliant with OSHA 1910.38. All activations are logged and reviewed.
        </p>
      </div>
    </div>
  );
};

export default SOS;
