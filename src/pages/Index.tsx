import { useState, useCallback } from "react";
import { Shield, Flame, Coins, ChevronRight, Activity, Battery, ThumbsUp, ThumbsDown, Zap, Droplets, HardHat } from "lucide-react";
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";

/* ─── flashcard data ─── */
const flashcardData = [
  {
    id: 1,
    image: "⚡",
    question: "Is it safe to service this electrical panel without lockout?",
    answer: false,
    points: 150,
    gradient: "from-yellow-500/15 to-orange-500/15",
    icon: Zap,
  },
  {
    id: 2,
    image: "🧪",
    question: "Can you handle this chemical without gloves?",
    answer: false,
    points: 200,
    gradient: "from-blue-500/15 to-cyan-500/15",
    icon: Droplets,
  },
  {
    id: 3,
    image: "🪜",
    question: "Is this harness properly clipped for elevated work?",
    answer: true,
    points: 175,
    gradient: "from-green-500/15 to-emerald-500/15",
    icon: HardHat,
  },
  {
    id: 4,
    image: "🔥",
    question: "Is it safe to use water on an electrical fire?",
    answer: false,
    points: 125,
    gradient: "from-red-500/15 to-orange-500/15",
    icon: Flame,
  },
  {
    id: 5,
    image: "🏗️",
    question: "Is the scaffolding inspected and tagged for today?",
    answer: true,
    points: 160,
    gradient: "from-violet-500/15 to-purple-500/15",
    icon: HardHat,
  },
];

/* ─── Swipeable Card Component ─── */
const SwipeCard = ({
  card,
  onSwipe,
  isTop,
}: {
  card: (typeof flashcardData)[0];
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const safeOpacity = useTransform(x, [0, 100], [0, 1]);
  const unsafeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    }
  };

  const Icon = card.icon;

  return (
    <motion.div
      className={`absolute inset-0 ${isTop ? "z-10 cursor-grab active:cursor-grabbing" : "z-0"}`}
      style={isTop ? { x, rotate } : {}}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.6 }}
      animate={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.6 }}
      exit={{ x: 300, opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className={`h-full glass-card p-5 md:p-7 flex flex-col bg-gradient-to-br ${card.gradient} border-border/20 overflow-hidden`}>
        {/* Swipe Indicators */}
        {isTop && (
          <>
            <motion.div
              className="absolute top-5 right-5 px-4 py-2 rounded-2xl border-2 border-primary bg-primary/10 z-20 rotate-12"
              style={{ opacity: safeOpacity }}
            >
              <span className="font-display text-sm md:text-base text-primary">Safe ✅</span>
            </motion.div>
            <motion.div
              className="absolute top-5 left-5 px-4 py-2 rounded-2xl border-2 border-destructive bg-destructive/10 z-20 -rotate-12"
              style={{ opacity: unsafeOpacity }}
            >
              <span className="font-display text-sm md:text-base text-destructive">Unsafe ❌</span>
            </motion.div>
          </>
        )}

        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-5 h-5 text-primary" />
          <span className="text-xs md:text-sm font-semibold text-muted-foreground">Quick Quiz</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl md:text-7xl block mb-5">{card.image}</span>
            <p className="font-display text-sm md:text-base text-foreground leading-relaxed max-w-sm mx-auto">
              {card.question}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/20">
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-5 h-5 text-destructive/50" />
            <span className="text-xs font-semibold text-destructive/50">← Nope</span>
          </div>
          <span className="text-sm font-display text-warning">+{card.points} pts</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary/50">Yep →</span>
            <ThumbsUp className="w-5 h-5 text-primary/50" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Home Screen ─── */
const Index = () => {
  const { points, streak, shieldHealth, completeTraining } = useGameStore();
  const [cardIndex, setCardIndex] = useState(0);

  const circumference = 2 * Math.PI * 62;
  const strokeDashoffset = circumference - (shieldHealth / 100) * circumference;

  const handleSwipe = useCallback(
    (dir: "left" | "right") => {
      const card = flashcardData[cardIndex];
      if (card) {
        completeTraining(card.points);
      }
      setCardIndex((prev) => prev + 1);
    },
    [cardIndex, completeTraining]
  );

  const remainingCards = flashcardData.slice(cardIndex);

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 space-y-5 md:space-y-6">
      {/* Desktop: Two-column top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* ─── Feature 1: Digital Twin Avatar Card ─── */}
        <div className="glass-card p-5 md:p-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/3 pointer-events-none" />

          <div className="flex items-center gap-5 md:gap-6 relative z-10">
            <div className="relative animate-float shrink-0">
              <svg className="w-28 h-28 md:w-36 md:h-36 -rotate-90" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="66" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.1" />
                <circle cx="70" cy="70" r="62" fill="none" stroke="hsl(var(--secondary))" strokeWidth="5" strokeLinecap="round" />
                <circle
                  cx="70" cy="70" r="62" fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)] transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex flex-col items-center justify-center">
                  <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary animate-shield-pulse" />
                  <span className="text-[9px] md:text-[11px] font-mono text-primary/70 mt-0.5">OP-042</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="font-display text-base md:text-lg text-foreground">Your Digital Twin 🤖</h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Sector 7 · Zone B</p>

              <div className="mt-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs md:text-sm font-semibold text-primary">Protection Shield</span>
                    <span className="text-sm md:text-base font-display text-primary text-glow">{shieldHealth}%</span>
                  </div>
                  <div className="w-full h-2 md:h-2.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${shieldHealth}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <span className="px-2.5 py-1 md:px-3 md:py-1 rounded-xl bg-primary/10 border border-primary/20 text-[10px] md:text-xs font-semibold text-primary">✅ Bio-Sync OK</span>
                <span className="px-2.5 py-1 md:px-3 md:py-1 rounded-xl bg-warning/10 border border-warning/20 text-[10px] md:text-xs font-semibold text-warning">😌 Low Fatigue</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Feature 2: Streaks & Points Widget ─── */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <motion.div
            className="glass-card p-5 md:p-6 flex flex-col items-center justify-center relative overflow-hidden"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warning/4 to-orange-500/4 pointer-events-none" />
            <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-2 relative z-10">Safe Streak 🔥</p>
            <div className="relative z-10 flex items-center gap-2">
              <Flame className="w-8 h-8 md:w-10 md:h-10 text-warning" />
              <div>
                <span className="font-display text-4xl md:text-5xl text-warning text-glow-gold">{streak}</span>
                <span className="text-xs md:text-sm text-muted-foreground ml-1">days</span>
              </div>
            </div>
            <div className="mt-3 px-3 py-1 md:px-4 md:py-1.5 rounded-xl bg-warning/10 border border-warning/20 relative z-10">
              <span className="text-[10px] md:text-xs font-semibold text-warning">🏆 Personal Best!</span>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-5 md:p-6 flex flex-col items-center justify-center relative overflow-hidden"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-emerald-500/4 pointer-events-none" />
            <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-2 relative z-10">Safety Coins 💰</p>
            <div className="relative z-10 flex items-center gap-2">
              <Coins className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              <span className="font-display text-4xl md:text-5xl text-primary text-glow">
                {points.toLocaleString()}
              </span>
            </div>
            <span className="text-xs md:text-sm text-primary font-semibold mt-3 relative z-10">+850 today 📈</span>
          </motion.div>
        </div>
      </div>

      {/* ─── Feature 3: Swipeable Flashcards ─── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm md:text-base text-foreground">
            Quick Training 📚
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm font-semibold text-muted-foreground">
              {Math.min(cardIndex, flashcardData.length)}/{flashcardData.length}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {remainingCards.length > 0 ? (
          <div className="relative h-[300px] md:h-[360px] max-w-xl mx-auto">
            <AnimatePresence>
              {remainingCards.slice(0, 2).map((card, i) => (
                <SwipeCard
                  key={card.id}
                  card={card}
                  onSwipe={handleSwipe}
                  isTop={i === 0}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            className="glass-card p-10 md:p-14 text-center max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-5xl md:text-6xl mb-4 block">🎉</span>
            <p className="font-display text-base md:text-lg text-primary text-glow">All Done!</p>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              You've aced all your training for this shift. Great job! 💪
            </p>
          </motion.div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="glass-card p-3.5 md:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <span className="text-xs md:text-sm text-muted-foreground">🔋 Device 94%</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <span className="text-xs md:text-sm text-muted-foreground">💓 72 BPM</span>
        </div>
        <span className="text-xs md:text-sm font-semibold text-primary">All Good ✨</span>
      </div>
    </div>
  );
};

export default Index;
