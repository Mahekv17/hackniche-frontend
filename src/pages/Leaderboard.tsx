import { Trophy, TrendingUp, TrendingDown, Minus, Star, Crown, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";

const baseWorkers = [
  { rank: 1, name: "Marcus Chen", points: 14250, trend: "up", avatar: "MC" },
  { rank: 2, name: "Sarah Kim", points: 13800, trend: "up", avatar: "SK" },
  { rank: 3, name: "James Okoro", points: 12900, trend: "down", avatar: "JO" },
  { rank: 5, name: "Lisa Patel", points: 11200, trend: "flat", avatar: "LP" },
  { rank: 6, name: "David Ruiz", points: 10850, trend: "down", avatar: "DR" },
  { rank: 7, name: "Anna Volkov", points: 9300, trend: "up", avatar: "AV" },
  { rank: 8, name: "Tom Wright", points: 8750, trend: "flat", avatar: "TW" },
];

const medalStyles: Record<number, { gradient: string; border: string; shimmer: string }> = {
  1: {
    gradient: "from-yellow-400 to-amber-600",
    border: "border-yellow-500/40",
    shimmer: "animate-gold-shimmer",
  },
  2: {
    gradient: "from-gray-300 to-gray-500",
    border: "border-gray-400/40",
    shimmer: "animate-silver-shimmer",
  },
  3: {
    gradient: "from-orange-400 to-amber-700",
    border: "border-orange-500/40",
    shimmer: "animate-bronze-shimmer",
  },
};

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 md:w-4 md:h-4 text-primary" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 md:w-4 md:h-4 text-destructive/70" />;
  return <Minus className="w-4 h-4 md:w-4 md:h-4 text-muted-foreground" />;
};

const Leaderboard = () => {
  const { points } = useGameStore();

  const workers = [
    ...baseWorkers.filter((w) => w.rank < 4),
    { rank: 4, name: "You (Op. 042)", points, trend: "up", avatar: "42", isUser: true },
    ...baseWorkers.filter((w) => w.rank >= 5),
  ].sort((a, b) => b.points - a.points).map((w, i) => ({ ...w, rank: i + 1 }));

  const currentUser = workers.find((w) => "isUser" in w && w.isUser);

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 space-y-5 md:space-y-6">
      {/* Header + User Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          className="glass-card p-6 md:p-7 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-warning/3 to-transparent pointer-events-none" />
          <Crown className="w-10 h-10 md:w-12 md:h-12 text-warning mx-auto mb-2 relative z-10" />
          <h2 className="font-display text-lg md:text-xl text-foreground relative z-10">Leaderboard 🏆</h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 relative z-10">Live rankings · Sector 7</p>
        </motion.div>

        <motion.div
          className="glass-card p-5 md:p-7 border-primary/20 flex items-center justify-between"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.05 }}
        >
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Your Points</p>
            <p className="font-display text-3xl md:text-4xl text-primary text-glow">{points.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs md:text-sm text-muted-foreground">Rank</p>
            <p className="font-display text-3xl md:text-4xl text-foreground">#{currentUser?.rank || 4}</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-primary/10 border border-primary/20">
            <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-semibold text-primary">Live</span>
          </div>
        </motion.div>
      </div>

      {/* Rankings */}
      <div>
        <h3 className="font-display text-sm md:text-base text-foreground mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 md:w-5 md:h-5 text-warning" />
          Top Workers This Shift
        </h3>
        <div className="space-y-2.5 md:space-y-0 md:grid md:grid-cols-2 md:gap-3">
          {workers.map((worker, index) => {
            const medal = medalStyles[worker.rank];
            const isUser = "isUser" in worker && worker.isUser;

            return (
              <motion.div
                key={worker.avatar}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ y: -1 }}
                className={`glass-card p-3.5 md:p-4 flex items-center gap-3 transition-all ${isUser ? "border-primary/30 bg-primary/5 md:col-span-2" : ""
                  } ${medal?.border || ""} ${medal?.shimmer || ""}`}
              >
                {/* Rank Badge */}
                <div
                  className={`w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center font-display text-sm md:text-base shrink-0 ${medal
                      ? `bg-gradient-to-br ${medal.gradient} text-background`
                      : "bg-secondary text-muted-foreground"
                    }`}
                >
                  {worker.rank <= 3 ? (
                    <Medal className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    worker.rank
                  )}
                </div>

                {/* Avatar */}
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xs md:text-sm font-bold font-mono shrink-0 ${isUser
                      ? "bg-primary/15 border border-primary/30 text-primary"
                      : "bg-secondary text-secondary-foreground"
                    }`}
                >
                  {worker.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm md:text-base font-semibold truncate ${isUser ? "text-primary" : "text-foreground"}`}>
                    {worker.name} {isUser && "⭐"}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {worker.points.toLocaleString()} pts
                  </p>
                </div>

                <TrendIcon trend={worker.trend} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pinned User */}
      {currentUser && (
        <motion.div
          className="glass-card p-4 md:p-5 border-primary/30 bg-primary/5 flex items-center gap-3 sticky bottom-20 md:bottom-24"
          whileHover={{ y: -1 }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-sm md:text-base font-bold font-mono text-primary">
            {currentUser.rank}
          </div>
          <div className="flex-1">
            <p className="text-sm md:text-base font-semibold text-primary">Your Position 📍</p>
            <p className="text-xs md:text-sm text-muted-foreground">{currentUser.points.toLocaleString()} pts · Rank #{currentUser.rank}</p>
          </div>
          <TrendingUp className="w-5 h-5 text-primary" />
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;
