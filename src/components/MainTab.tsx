import { useHabits } from "@/context/HabitContext"
import HabitCard from "./HabitCard";

export default function MainTab() {
  const { habits } = useHabits();
  return (
    <>
      
      {habits.map((habit) => ( 
        <HabitCard key={habit.id} habit={habit}/>
      ))}
    
    </>
  )
}