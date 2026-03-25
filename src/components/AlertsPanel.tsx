import { motion, AnimatePresence } from "framer-motion";
import { X, Clock } from "lucide-react";
import { useGameStore } from "@/hooks/useGameStore";

const alertTypeColors: Record<string, string> = {
    warning: "border-l-warning bg-warning/4",
    success: "border-l-primary bg-primary/4",
    danger: "border-l-destructive bg-destructive/4",
    info: "border-l-blue-400 bg-blue-400/4",
};

const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
};

interface AlertsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const AlertsPanel = ({ isOpen, onClose }: AlertsPanelProps) => {
    const { alerts, dismissAlert } = useGameStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed top-0 right-0 w-full max-w-md h-full z-[70] flex flex-col"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 250 }}
                    >
                        <div className="flex-1 bg-background/95 backdrop-blur-2xl border-l border-border/20 flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-5 border-b border-border/20">
                                <div>
                                    <h2 className="font-display text-base text-foreground">Notifications 🔔</h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {alerts.length} {alerts.length === 1 ? "update" : "updates"}
                                    </p>
                                </div>
                                <motion.button
                                    onClick={onClose}
                                    className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-4 h-4 text-foreground" />
                                </motion.button>
                            </div>

                            {/* Alerts List */}
                            <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 space-y-2.5">
                                <AnimatePresence initial={false}>
                                    {alerts.map((alert) => (
                                        <motion.div
                                            key={alert.id}
                                            layout
                                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, x: 80, scale: 0.95 }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                            className={`glass-card border-l-4 p-4 ${alertTypeColors[alert.type] || ""}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="text-xl mt-0.5 shrink-0">{alert.icon}</span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h3 className="font-display text-xs text-foreground truncate">
                                                            {alert.title}
                                                        </h3>
                                                        <motion.button
                                                            onClick={() => dismissAlert(alert.id)}
                                                            className="shrink-0 w-6 h-6 rounded-lg hover:bg-secondary flex items-center justify-center"
                                                            whileTap={{ scale: 0.85 }}
                                                        >
                                                            <X className="w-3 h-3 text-muted-foreground" />
                                                        </motion.button>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                                        {alert.description}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 mt-2">
                                                        <Clock className="w-3 h-3 text-muted-foreground/50" />
                                                        <span className="text-[10px] text-muted-foreground/50">
                                                            {formatTime(alert.timestamp)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {alerts.length === 0 && (
                                    <div className="text-center py-16">
                                        <span className="text-4xl block mb-3">😌</span>
                                        <p className="font-display text-sm text-muted-foreground">All caught up!</p>
                                        <p className="text-xs text-muted-foreground/60 mt-1">No new notifications</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AlertsPanel;
