import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Alert {
  id: string;
  icon: string;
  title: string;
  description: string;
  timestamp: Date;
  type: "warning" | "success" | "danger" | "info";
}

interface GameState {
  points: number;
  streak: number;
  shieldHealth: number;
  alerts: Alert[];
  userName: string;
  userAvatar: string;
  userRank: number;
}

interface GameActions {
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean;
  addAlert: (alert: Omit<Alert, "id" | "timestamp">) => void;
  captureHazard: () => void;
  completeTraining: (points: number) => void;
  dismissAlert: (id: string) => void;
  requestCoolDown: () => void;
  activateSOS: () => void;
  deactivateSOS: () => void;
}

type GameStore = GameState & GameActions;

const initialAlerts: Omit<Alert, "id" | "timestamp">[] = [
  { icon: "⚠️", title: "SECTOR B SPILL REPORTED", description: "Cleaning crew dispatched to Zone B-7. Avoid area.", type: "warning" },
  { icon: "🎉", title: "STREAK MAINTAINED!", description: "Your 14-day incident-free streak is a new personal best!", type: "success" },
  { icon: "🛡️", title: "SHIELD FULLY CHARGED", description: "All safety protocols up to date. Protection at 100%.", type: "info" },
  { icon: "📋", title: "NEW TRAINING AVAILABLE", description: "Complete 'Chemical Handling 201' for +200 bonus points.", type: "info" },
  { icon: "🏆", title: "LEADERBOARD UPDATE", description: "You moved up to Rank #4! Keep going!", type: "success" },
];

const GameContext = createContext<GameStore | null>(null);

let alertIdCounter = 0;
const generateId = () => `alert-${Date.now()}-${++alertIdCounter}`;

export const GameStoreProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(12450);
  const [streak, setStreak] = useState(14);
  const [shieldHealth, setShieldHealth] = useState(100);
  const [alerts, setAlerts] = useState<Alert[]>(
    initialAlerts.map((a, i) => ({
      ...a,
      id: generateId(),
      timestamp: new Date(Date.now() - (i + 1) * 15 * 60 * 1000),
    }))
  );
  const [userName] = useState("Operator 042");
  const [userAvatar] = useState("42");
  const [userRank] = useState(4);

  const addAlert = useCallback((alert: Omit<Alert, "id" | "timestamp">) => {
    const newAlert: Alert = {
      ...alert,
      id: generateId(),
      timestamp: new Date(),
    };
    setAlerts((prev) => [newAlert, ...prev]);
  }, []);

  const addPoints = useCallback(
    (amount: number) => {
      setPoints((prev) => prev + amount);
    },
    []
  );

  const spendPoints = useCallback(
    (amount: number) => {
      let success = false;
      setPoints((prev) => {
        if (prev >= amount) {
          success = true;
          return prev - amount;
        }
        success = false;
        return prev;
      });
      // We need to return synchronously, but setState is async.
      // Use a ref-like approach: check current state
      if (points >= amount) {
        return true;
      }
      return false;
    },
    [points]
  );

  const captureHazard = useCallback(() => {
    addPoints(500);
    addAlert({
      icon: "🔍",
      title: "HAZARD REPORTED",
      description: "Hazard captured and logged. +500 Safety Coins awarded!",
      type: "success",
    });
  }, [addPoints, addAlert]);

  const completeTraining = useCallback(
    (pts: number) => {
      addPoints(pts);
      addAlert({
        icon: "✅",
        title: "TRAINING COMPLETE",
        description: `Micro-training completed! +${pts} Safety Coins earned.`,
        type: "success",
      });
    },
    [addPoints, addAlert]
  );

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const requestCoolDown = useCallback(() => {
    addAlert({
      icon: "😮‍💨",
      title: "COOL-DOWN REQUESTED",
      description: "10-minute cool-down break request sent to supervisor.",
      type: "info",
    });
  }, [addAlert]);

  const activateSOS = useCallback(() => {
    addAlert({
      icon: "🚨",
      title: "SOS ACTIVATED",
      description: "Emergency dispatch notified. ETA 3 minutes. Stay calm.",
      type: "danger",
    });
  }, [addAlert]);

  const deactivateSOS = useCallback(() => {
    addAlert({
      icon: "✅",
      title: "SOS CANCELLED",
      description: "Emergency alert has been cancelled. All clear.",
      type: "info",
    });
  }, [addAlert]);

  const store: GameStore = {
    points,
    streak,
    shieldHealth,
    alerts,
    userName,
    userAvatar,
    userRank,
    addPoints,
    spendPoints,
    addAlert,
    captureHazard,
    completeTraining,
    dismissAlert,
    requestCoolDown,
    activateSOS,
    deactivateSOS,
  };

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};

export const useGameStore = (): GameStore => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGameStore must be used within a GameStoreProvider");
  }
  return ctx;
};
