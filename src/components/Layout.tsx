import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Trophy, Camera, Gift, AlertTriangle, Bell, User } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/leaderboard", icon: Trophy, label: "Rank" },
  { path: "/camera", icon: Camera, label: "Scan", isFab: true },
  { path: "/store", icon: Gift, label: "Store" },
  { path: "/sos", icon: AlertTriangle, label: "SOS" },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="w-full max-w-md relative flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 glass-card-strong border-b border-border/30 px-4 py-3 flex items-center justify-between rounded-none">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xs font-bold tracking-wider text-foreground">SAFEGUARD PRO</h1>
              <span className="text-[10px] font-mono text-primary tracking-wide">SHIFT: ACTIVE</span>
            </div>
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse-glow" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 pt-16 pb-20 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 glass-card-strong border-t border-border/30 rounded-none">
          <div className="flex items-center justify-around py-2 px-2 relative">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              if (item.isFab) {
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="relative -mt-7 w-14 h-14 rounded-full bg-primary flex items-center justify-center glow-green-strong transition-transform active:scale-95"
                  >
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </button>
                );
              }

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
