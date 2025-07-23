import { Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { useHabits } from "@/context/HabitContext";
import Habit, { Outcome } from "@/types/Habit";

interface OutcomeButtonProps {
  outcome: Outcome;
  selected: boolean;
  date: string;
  habitId: string;
}
export default function OutcomeButton({ outcome, selected, date, habitId }: OutcomeButtonProps) {
  const { setOutcome } = useHabits();
  return (
    <Button variant="ghost" size={selected ? 'lg' : 'icon'} className={`bg-${outcome}-500 hover:bg-${outcome}-700 rounded-l-none`}
      onClick={() => setOutcome(habitId, date, outcome)}
    >
      {outcome === Outcome.DONE ? <Check/> : <X/>}
      
      <span className="sr-only">Record Habit Done</span>
    </Button>
  )
}