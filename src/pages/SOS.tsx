import { useState, useRef } from "react";
import { AlertTriangle, MapPin, Heart, Moon, Radio, Info, Shield } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

const SOS = () => {
  const [activated, setActivated] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const sliderWidth = 260;
  const thumbWidth = 56;
  const maxDrag = sliderWidth - thumbWidth;
  const bgOpacity = useTransform(x, [0, maxDrag], [0, 1]);

  const handleDragEnd = () => {
    if (x.get() > maxDrag * 0.85) {
      setActivated(true);
    } else {
      x.set(0);
    }
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* System Status */}
      <div className="glass-card p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-primary animate-pulse-glow" />
          <span className="text-[10px] font-mono text-primary">SYSTEM: 98% READY</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[10px] font-mono text-muted-foreground">LOC PRECISION: HIGH</span>
        </div>
      </div>

      {/* Emergency Card */}
      <div className={`glass-card p-5 border ${activated ? "border-destructive/60 bg-destructive/10" : "border-destructive/30"}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h2 className="font-display text-sm font-bold tracking-wider text-foreground">EMERGENCY RESPONSE</h2>
            <p className="text-[10px] text-muted-foreground font-mono">SWIPE TO ACTIVATE DISTRESS SIGNAL</p>
          </div>
        </div>

        {activated ? (
          <div className="text-center py-6">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-3 animate-pulse" />
            <p className="font-display text-sm font-bold tracking-wider text-destructive">SOS ACTIVATED</p>
            <p className="text-xs text-muted-foreground font-mono mt-2">DISPATCH NOTIFIED • ETA 3 MIN</p>
            <Button
              onClick={() => { setActivated(false); x.set(0); }}
              variant="outline"
              size="sm"
              className="mt-4 text-[10px] font-display tracking-wider border-destructive/40 text-destructive"
            >
              CANCEL ALERT
            </Button>
          </div>
        ) : (
          <div
            ref={constraintsRef}
            className="relative h-14 rounded-full bg-destructive/10 border border-destructive/30 overflow-hidden mt-4"
            style={{ width: sliderWidth }}
          >
            <motion.div
              className="absolute inset-0 bg-destructive/30 rounded-full"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[10px] font-display tracking-[0.2em] text-destructive/60">SLIDE TO SOS →</span>
            </div>
            <motion.div
              className="absolute top-1 left-1 w-12 h-12 rounded-full bg-destructive flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
              drag="x"
              dragConstraints={{ left: 0, right: maxDrag }}
              dragElastic={0}
              dragMomentum={false}
              style={{ x }}
              onDragEnd={handleDragEnd}
            >
              <AlertTriangle className="w-5 h-5 text-destructive-foreground" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Vitals Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card p-4">
          <p className="text-[10px] font-display tracking-wider text-muted-foreground mb-2">FATIGUE INDEX</p>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-warning">32</span>
            <span className="text-xs font-mono text-muted-foreground">/ 100</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden mt-2">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-warning" style={{ width: "32%" }} />
          </div>
          <p className="text-[9px] font-mono text-primary mt-1">WITHIN SAFE RANGE</p>
        </div>

        <div className="glass-card p-4">
          <p className="text-[10px] font-display tracking-wider text-muted-foreground mb-2">BIOMETRIC</p>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-destructive animate-pulse" />
            <span className="font-display text-2xl font-bold text-foreground">72</span>
            <span className="text-xs font-mono text-muted-foreground">BPM</span>
          </div>
          <p className="text-[9px] font-mono text-primary mt-2">HEART RATE NORMAL</p>
        </div>
      </div>

      {/* Cool-Down Request */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-display text-[11px] font-bold tracking-wider text-foreground">MANAGEMENT PROTOCOL</h3>
            <p className="text-[10px] text-muted-foreground">Request supervisor-approved intervention</p>
          </div>
        </div>
        <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-display text-[10px] tracking-wider h-10 gap-2">
          <Moon className="w-4 h-4" />
          REQUEST COOL-DOWN BREAK
        </Button>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 px-2">
        <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-[9px] text-muted-foreground/60 font-mono leading-relaxed">
          EMERGENCY PROTOCOL COMPLIANT WITH OSHA 1910.38. ALL ACTIVATIONS ARE LOGGED AND REVIEWED.
        </p>
      </div>
    </div>
  );
};

export default SOS;
