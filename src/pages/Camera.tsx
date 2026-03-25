import { useNavigate } from "react-router-dom";
import { X, Zap, Image, Crosshair, Wifi, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CameraPage = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-background flex flex-col z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-[10px] font-mono text-destructive tracking-wider">LIVE FEED // ACTIVE</span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi className="w-3.5 h-3.5 text-primary" />
          <span className="text-[9px] font-mono text-muted-foreground">4G</span>
        </div>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 relative mx-4 my-2">
        <div className="absolute inset-0 rounded-xl bg-secondary/30 border border-border/30 overflow-hidden">
          {/* Simulated scan lines */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary)/0.1) 2px, hsl(var(--primary)/0.1) 4px)",
            }}
          />
        </div>

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary rounded-tl-sm" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary rounded-tr-sm" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary rounded-bl-sm" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary rounded-br-sm" />

        {/* Center Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Crosshair className="w-10 h-10 text-primary/30" />
        </div>

        {/* Header */}
        <div className="absolute top-6 left-0 right-0 text-center">
          <p className="font-display text-xs font-bold tracking-[0.3em] text-primary text-glow">HAZARD SCAN</p>
        </div>

        {/* Detection Overlay */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/15 border border-warning/40">
          <AlertTriangle className="w-3.5 h-3.5 text-warning" />
          <span className="text-[10px] font-display tracking-wider text-warning">OBSTRUCTION DETECTED</span>
        </div>

        {/* Telemetry */}
        <div className="absolute bottom-6 left-6 space-y-1">
          <p className="text-[9px] font-mono text-muted-foreground">ISO 3200 • f/1.8</p>
          <p className="text-[9px] font-mono text-muted-foreground">48MP • H.265 ENC</p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-4 py-6 flex items-center justify-between">
        <div className="w-11 h-11 rounded-lg bg-secondary border border-border overflow-hidden flex items-center justify-center">
          <Image className="w-5 h-5 text-muted-foreground" />
        </div>

        <Button
          className="h-14 px-6 rounded-full bg-primary text-primary-foreground font-display text-[11px] tracking-wider glow-green-strong hover:bg-primary/90 gap-2"
        >
          <Crosshair className="w-4 h-4" />
          CAPTURE HAZARD +500 PTS
        </Button>

        <button className="w-11 h-11 rounded-full bg-secondary border border-border flex items-center justify-center">
          <Zap className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default CameraPage;
