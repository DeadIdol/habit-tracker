// HabitContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Habit, {  defaultHabits } from "@/types/Habit"


type HabitContextType = {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);

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
    <HabitContext.Provider value={{ habits, setHabits }}>
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
