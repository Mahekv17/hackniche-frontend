import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after a short delay so user can see the app first
      setTimeout(() => setIsVisible(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setIsVisible(false);
    setInstallPrompt(null);
  };

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 left-4 right-4 z-50 max-w-sm mx-auto"
        >
          <div className="glass-card-strong p-4 flex items-center gap-4 border border-[#58CC02]/30 shadow-lg">
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#58CC02]/10 border border-[#58CC02]/20 flex items-center justify-center shrink-0">
              <span className="text-2xl">🛡️</span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">Install SafeGuard Pro</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add to home screen for offline access
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstall}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#58CC02] text-white text-xs font-bold hover:bg-[#4ab501] transition-colors"
              >
                <Download size={12} />
                Install
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
