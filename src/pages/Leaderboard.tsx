import { Trophy, TrendingUp, TrendingDown, Minus, Star } from "lucide-react";

const workers = [
  { rank: 1, name: "Marcus Chen", points: 14250, trend: "up", avatar: "MC" },
  { rank: 2, name: "Sarah Kim", points: 13800, trend: "up", avatar: "SK" },
  { rank: 3, name: "James Okoro", points: 12900, trend: "down", avatar: "JO" },
  { rank: 4, name: "You (Op. 042)", points: 12450, trend: "up", avatar: "42", isUser: true },
  { rank: 5, name: "Lisa Patel", points: 11200, trend: "flat", avatar: "LP" },
  { rank: 6, name: "David Ruiz", points: 10850, trend: "down", avatar: "DR" },
  { rank: 7, name: "Anna Volkov", points: 9300, trend: "up", avatar: "AV" },
  { rank: 8, name: "Tom Wright", points: 8750, trend: "flat", avatar: "TW" },
];

const medalColors: Record<number, string> = {
  1: "from-yellow-400 to-amber-600",
  2: "from-gray-300 to-gray-500",
  3: "from-orange-400 to-amber-700",
};

const medalBorders: Record<number, string> = {
  1: "border-yellow-500/50",
  2: "border-gray-400/50",
  3: "border-orange-500/50",
};

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-primary" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-destructive" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

const Leaderboard = () => {
  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div className="glass-card p-4 text-center">
        <Trophy className="w-8 h-8 text-warning mx-auto mb-2" />
        <h2 className="font-display text-sm font-bold tracking-wider text-foreground">SHIFT LEADERBOARD</h2>
        <p className="text-[10px] text-muted-foreground font-mono mt-1">REAL-TIME RANKINGS • SECTOR 7</p>
      </div>

      {/* User Points */}
      <div className="glass-card p-4 border-primary/30 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-display tracking-wider text-muted-foreground">YOUR POINTS</p>
          <p className="font-display text-2xl font-bold text-primary text-glow">12,450</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-display tracking-wider text-muted-foreground">RANK</p>
          <p className="font-display text-2xl font-bold text-foreground">#4</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/15 border border-primary/30">
          <TrendingUp className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-mono text-primary">+850 TODAY</span>
        </div>
      </div>

      {/* Rankings */}
      <div>
        <h3 className="font-display text-xs font-bold tracking-wider text-foreground mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-warning" />
          TOP WORKERS OF THE SHIFT
        </h3>
        <div className="space-y-2">
          {workers.map((worker) => (
            <div
              key={worker.rank}
              className={`glass-card p-3 flex items-center gap-3 transition-colors ${
                worker.isUser ? "border-primary/40 bg-primary/5" : ""
              } ${medalBorders[worker.rank] || ""}`}
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold ${
                medalColors[worker.rank]
                  ? `bg-gradient-to-br ${medalColors[worker.rank]} text-background`
                  : "bg-secondary text-muted-foreground"
              }`}>
                {worker.rank}
              </div>

              {/* Avatar */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                worker.isUser
                  ? "bg-primary/20 border border-primary/50 text-primary"
                  : "bg-secondary text-secondary-foreground"
              }`}>
                {worker.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${worker.isUser ? "text-primary" : "text-foreground"}`}>
                  {worker.name}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">{worker.points.toLocaleString()} PTS</p>
              </div>

              {/* Trend */}
              <TrendIcon trend={worker.trend} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
