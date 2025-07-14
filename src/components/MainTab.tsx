import { useHabits } from "@/context/HabitContext"
import HabitCard from "./HabitCard";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getCurrentDateString } from "@/util/date_utils";

export default function MainTab() {
  const { habits, setHabits } = useHabits();
  const [dateString, setDateString] = useState(getCurrentDateString());

  return (
    <div className="flex flex-col items-center space-y-3 ">
      

      <Input type='date' value={dateString} onChange={(e) => setDateString(e.target.value)} className="w-min"></Input>
      <Button
      onClick={() => {
        setHabits(
          [
          { id: crypto.randomUUID(),
            title:"",
            description:"",
            resolutions:[],
            log: {}
          },
            
            ...habits]
        )
      }}
      >New Habit</Button>
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} date={dateString} />
      ))}
    </div>
  )
}