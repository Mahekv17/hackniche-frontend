import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Trophy, Camera, Gift, AlertTriangle, Bell, User, Coins } from "lucide-react";
import { useGameStore } from "@/hooks/useGameStore";
import AlertsPanel from "./AlertsPanel";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/leaderboard", icon: Trophy, label: "Rank" },
  { path: "/camera", icon: Camera, label: "Report", isFab: true },
  { path: "/store", icon: Gift, label: "Store" },
  { path: "/sos", icon: AlertTriangle, label: "SOS" },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { points, alerts } = useGameStore();
  const [alertsOpen, setAlertsOpen] = useState(false);

  const unreadCount = alerts.length;

  if (location.pathname === "/camera") {
    return (
      <div className="min-h-screen bg-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[480px] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl relative flex flex-col min-h-screen transition-all">
        {/* Top Bar */}
        <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl z-50 glass-card-strong border-b border-border/20 px-4 md:px-8 py-3 flex items-center justify-between rounded-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center">
              <User className="w-5 h-5 md:w-5 md:h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-sm md:text-base tracking-wide text-foreground">SafeGuard Pro</h1>
              <span className="text-[10px] md:text-xs font-mono text-primary/80">✨ Shift Active</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Points Pill */}
            <motion.div
              className="flex items-center gap-1.5 px-3.5 py-2 md:px-4 md:py-2 rounded-2xl bg-primary/10 border border-primary/20"
              whileTap={{ scale: 0.95 }}
            >
              <Coins className="w-4 h-4 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-display tracking-wide text-primary">
                {points.toLocaleString()}
              </span>
            </motion.div>

            {/* Alerts Bell */}
            <motion.button
              onClick={() => setAlertsOpen(true)}
              className="relative p-2 rounded-2xl hover:bg-secondary/50 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] px-1 bg-primary rounded-full flex items-center justify-center animate-soft-pulse">
                  <span className="text-[10px] font-display font-bold text-primary-foreground">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                </span>
              )}
            </motion.button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 pt-[72px] md:pt-20 pb-20 md:pb-24 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl z-50 glass-card-strong border-t border-border/20 rounded-none">
          <div className="flex items-center justify-around py-2.5 md:py-3 px-2 md:px-8 relative">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              if (item.isFab) {
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="relative -mt-7 md:-mt-8 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center glow-green-strong"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                  </motion.button>
                );
              }

              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-1 py-1.5 px-4 md:px-6 rounded-2xl transition-all duration-200 ${isActive ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground"
                    }`}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? "drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]" : ""}`} />
                  <span className="text-[10px] md:text-xs font-semibold tracking-wide">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Alerts Panel */}
        <AlertsPanel isOpen={alertsOpen} onClose={() => setAlertsOpen(false)} />
      </div>
    </div>
  );
};

export default Layout;
