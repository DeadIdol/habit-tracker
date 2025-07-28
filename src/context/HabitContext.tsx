// HabitContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Habit, { defaultHabits } from "@/types/Habit"
import { Outcome } from "@/types/Outcome";


type HabitContextType = {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  setOutcome: (habitId: string, date: string, outcome: Outcome) => void;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);

  // Update outcome for a specific habit and date
  const setOutcome = (habitId: string, date: string, outcome: Outcome) => {
    setHabits(habits.map((h) => {
      if (h.id === habitId) {
        return {
          ...h,
          log: { ...h.log, [date]: outcome }
        }
      }
      else {
        return h
      }
    }))

    

  };

  // Load from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("habit-tracker-data");
    if (raw) setHabits(JSON.parse(raw));
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("habit-tracker-data", JSON.stringify(habits));
  }, [habits]);

  return (
    <HabitContext.Provider value={{ habits, setHabits, setOutcome }}>
      {children}
    </HabitContext.Provider>
  );
};

// Custom hook to use context
export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error("useHabits must be used within a HabitProvider");
  return context;
};
