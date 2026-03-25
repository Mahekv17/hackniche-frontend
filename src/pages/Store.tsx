import { Gift, Coffee, Utensils, HardHat, Clock, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const rewards = [
  { title: "Free Lunch Voucher", points: 1000, icon: Utensils, desc: "Redeemable at cafeteria", available: true },
  { title: "Team Coffee Round", points: 500, icon: Coffee, desc: "Treats for your whole crew", available: true },
  { title: "15-Min Break Pass", points: 2500, icon: Clock, desc: "Extra break, supervisor approved", available: true },
  { title: "Premium Safety Gear", points: 5000, icon: HardHat, desc: "Custom-fit equipment upgrade", available: true, premium: true },
];

const Store = () => {
  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="font-display text-sm font-bold tracking-wider text-foreground">REWARD STORE</h2>
            <p className="text-[10px] text-muted-foreground font-mono mt-1">REDEEM YOUR HARD-EARNED POINTS</p>
          </div>
          <Gift className="w-6 h-6 text-primary" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-primary text-glow">12,450</span>
          <span className="text-xs font-mono text-muted-foreground">PTS AVAILABLE</span>
        </div>
      </div>

      {/* Rewards */}
      <div className="space-y-3">
        {rewards.map((reward) => (
          <div
            key={reward.title}
            className={`glass-card p-4 ${reward.premium ? "border-warning/30" : ""}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                reward.premium
                  ? "bg-gradient-to-br from-warning/20 to-orange-500/20 border border-warning/30"
                  : "bg-primary/10 border border-primary/20"
              }`}>
                <reward.icon className={`w-6 h-6 ${reward.premium ? "text-warning" : "text-primary"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-[11px] font-bold tracking-wider text-foreground">{reward.title}</h3>
                  {reward.premium && <Sparkles className="w-3 h-3 text-warning" />}
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{reward.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-mono text-sm font-bold text-primary">{reward.points.toLocaleString()} PTS</span>
                  <Button
                    size="sm"
                    className={`h-7 text-[10px] font-display tracking-wider ${
                      reward.premium
                        ? "bg-gradient-to-r from-warning to-orange-500 text-background hover:from-warning/90 hover:to-orange-500/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 glow-green"
                    }`}
                  >
                    REDEEM
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Locked Section */}
      <div className="glass-card p-4 border-dashed border-muted-foreground/30 text-center">
        <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
        <p className="font-display text-[10px] tracking-wider text-muted-foreground">NEW REWARDS UNLOCKING SOON</p>
        <p className="text-[9px] text-muted-foreground/60 font-mono mt-1">REACH 15,000 PTS TO UNLOCK TIER 2</p>
      </div>
    </div>
  );
};

export default Store;
