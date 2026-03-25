import { Gift, Coffee, Utensils, HardHat, Clock, Lock, Sparkles, Coins, Star, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";
import { toast } from "sonner";

const rewards = [
  { title: "Free Canteen Coffee", points: 500, icon: Coffee, desc: "Any cafeteria station ☕", available: true, color: "from-amber-500/10 to-orange-500/10" },
  { title: "Free Lunch Voucher", points: 1000, icon: Utensils, desc: "Choose any combo meal 🍱", available: true, color: "from-green-500/10 to-emerald-500/10" },
  { title: "15-Min Extra Break", points: 2500, icon: Clock, desc: "Supervisor-approved 😴", available: true, color: "from-blue-500/10 to-cyan-500/10" },
  { title: "Movie Night Pass", points: 1500, icon: Ticket, desc: "2 tickets for the weekend 🎬", available: true, color: "from-purple-500/10 to-violet-500/10" },
  { title: "Premium Safety Gear", points: 5000, icon: HardHat, desc: "Custom-fit equipment upgrade 🛡️", available: true, premium: true, color: "from-warning/10 to-orange-500/10" },
  { title: "Extra Day Off", points: 10000, icon: Star, desc: "One additional paid day off 🏖️", available: true, premium: true, color: "from-yellow-500/10 to-amber-500/10" },
];

const Store = () => {
  const { points, spendPoints, addAlert } = useGameStore();

  const handleRedeem = (reward: (typeof rewards)[0]) => {
    if (points >= reward.points) {
      spendPoints(reward.points);
      addAlert({
        icon: "🎁",
        title: "Reward Redeemed!",
        description: `${reward.title} redeemed for ${reward.points.toLocaleString()} coins!`,
        type: "success",
      });
      toast.success(`${reward.title} redeemed! 🎉`, {
        description: `${reward.points.toLocaleString()} Safety Coins deducted.`,
      });
    } else {
      toast.error("Not enough coins yet! 😅", {
        description: `You need ${(reward.points - points).toLocaleString()} more coins.`,
      });
    }
  };

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 space-y-5 md:space-y-6">
      {/* Header */}
      <motion.div
        className="glass-card p-6 md:p-7 relative overflow-hidden"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-emerald-500/3 pointer-events-none" />
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div>
            <h2 className="font-display text-lg md:text-xl text-foreground">Reward Store 🎁</h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Spend your hard-earned coins!</p>
          </div>
          <Gift className="w-7 h-7 md:w-9 md:h-9 text-primary" />
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <Coins className="w-6 h-6 md:w-7 md:h-7 text-primary" />
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl md:text-4xl text-primary text-glow">
              {points.toLocaleString()}
            </span>
            <span className="text-sm md:text-base text-muted-foreground">coins available</span>
          </div>
        </div>
      </motion.div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {rewards.map((reward, index) => {
          const canAfford = points >= reward.points;

          return (
            <motion.div
              key={reward.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, type: "spring", stiffness: 200 }}
              whileHover={{ y: -3 }}
              className={`glass-card p-4 md:p-5 flex flex-col bg-gradient-to-br ${reward.color} ${reward.premium ? "border-warning/25" : ""
                } ${!canAfford ? "opacity-50" : ""} relative overflow-hidden`}
            >
              {reward.premium && (
                <div className="absolute top-3 right-3">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-warning" />
                </div>
              )}

              <div
                className={`w-11 h-11 md:w-13 md:h-13 rounded-xl flex items-center justify-center mb-3 ${reward.premium
                    ? "bg-gradient-to-br from-warning/15 to-orange-500/15 border border-warning/20"
                    : "bg-primary/8 border border-primary/15"
                  }`}
              >
                <reward.icon className={`w-5 h-5 md:w-6 md:h-6 ${reward.premium ? "text-warning" : "text-primary"}`} />
              </div>

              <h3 className="font-display text-xs md:text-sm text-foreground leading-tight">
                {reward.title}
              </h3>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1 flex-1">{reward.desc}</p>

              <div className="mt-3 space-y-2.5">
                <span className="font-mono text-sm md:text-base font-bold text-primary block">
                  {reward.points.toLocaleString()} pts
                </span>
                <Button
                  size="sm"
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford}
                  className={`w-full h-8 md:h-9 text-xs md:text-sm font-semibold rounded-xl ${!canAfford
                      ? "bg-secondary text-muted-foreground"
                      : reward.premium
                        ? "bg-gradient-to-r from-warning to-orange-500 text-background hover:from-warning/90 hover:to-orange-500/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 glow-green"
                    }`}
                >
                  {canAfford ? "Redeem ✨" : "🔒 Locked"}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Locked Section */}
      <div className="glass-card p-5 md:p-7 border-dashed border-muted-foreground/20 text-center">
        <Lock className="w-7 h-7 md:w-9 md:h-9 text-muted-foreground mx-auto mb-2" />
        <p className="font-display text-xs md:text-sm text-muted-foreground">More Rewards Coming Soon! 🚀</p>
        <p className="text-xs md:text-sm text-muted-foreground/60 mt-1">Reach 15,000 pts to unlock Tier 2</p>
      </div>
    </div>
  );
};

export default Store;
