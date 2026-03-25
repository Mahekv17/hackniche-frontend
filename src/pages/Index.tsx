import { Zap, Shield, Flame, ChevronRight, Activity, Battery } from "lucide-react";

const safetyScore = 87;
const circumference = 2 * Math.PI * 45;
const strokeDashoffset = circumference - (safetyScore / 100) * circumference;

const flashcards = [
  { title: "HIGH VOLTAGE LOCKOUT", desc: "De-energize before servicing electrical panels", icon: Zap, points: 150, color: "from-yellow-500/20 to-orange-500/20" },
  { title: "CHEMICAL HANDLING", desc: "Always wear nitrile gloves and eye protection", icon: Shield, points: 200, color: "from-blue-500/20 to-cyan-500/20" },
  { title: "FIRE SUPPRESSION", desc: "Locate nearest extinguisher before shift start", icon: Flame, points: 175, color: "from-red-500/20 to-orange-500/20" },
  { title: "FALL PROTECTION", desc: "Inspect harness clips before ascending", icon: Activity, points: 125, color: "from-green-500/20 to-emerald-500/20" },
];

const Index = () => {
  return (
    <div className="px-4 py-4 space-y-4">
      {/* Operator Status Card */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/50 flex items-center justify-center">
            <span className="font-display text-sm font-bold text-primary">042</span>
          </div>
          <div className="flex-1">
            <h2 className="font-display text-sm font-bold tracking-wider text-foreground">OPERATOR 042</h2>
            <p className="text-xs text-muted-foreground font-mono">SECTOR 7 • ZONE B</p>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-[10px] font-mono text-primary">BIO-SYNC OK</span>
          <span className="px-2 py-0.5 rounded-full bg-warning/15 border border-warning/30 text-[10px] font-mono text-warning">FATIGUE: LOW</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary" style={{ width: "78%" }} />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 font-mono">SHIFT PROGRESS: 78%</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Safety Score */}
        <div className="glass-card p-4 flex flex-col items-center">
          <p className="text-[10px] font-display tracking-wider text-muted-foreground mb-2">SAFETY SCORE</p>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-bold text-primary text-glow">{safetyScore}</span>
              <span className="text-[9px] text-muted-foreground font-mono">/ 100</span>
            </div>
          </div>
          <span className="text-[10px] text-primary font-mono mt-1">+12% TODAY ▲</span>
        </div>

        {/* Streak */}
        <div className="glass-card p-4 flex flex-col items-center justify-center">
          <p className="text-[10px] font-display tracking-wider text-muted-foreground mb-2">INCIDENT FREE</p>
          <div className="relative">
            <Shield className="w-16 h-16 text-warning/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-bold text-warning">14</span>
              <span className="text-[9px] text-muted-foreground font-mono">DAYS</span>
            </div>
          </div>
          <div className="mt-2 px-2 py-0.5 rounded-full bg-warning/15 border border-warning/30">
            <span className="text-[9px] font-display tracking-wider text-warning">NEW PERSONAL BEST</span>
          </div>
        </div>
      </div>

      {/* Flashcards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-xs font-bold tracking-wider text-foreground">RAPID PROTOCOL REVIEW</h3>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {flashcards.map((card) => (
            <div
              key={card.title}
              className={`glass-card min-w-[220px] snap-start p-4 flex flex-col bg-gradient-to-br ${card.color} border-border/30`}
            >
              <card.icon className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-display text-[11px] font-bold tracking-wider text-foreground mb-1">{card.title}</h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed flex-1">{card.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[9px] font-mono text-primary">TAP TO REVIEW</span>
                <span className="text-[10px] font-mono text-warning">+{card.points} PTS</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="glass-card p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-mono text-muted-foreground">DEVICE: 94%</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-mono text-muted-foreground">HEART: 72 BPM</span>
        </div>
        <span className="text-[10px] font-mono text-primary">ALL NOMINAL</span>
      </div>
    </div>
  );
};

export default Index;
