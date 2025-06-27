import { useHabits } from "@/context/HabitContext"
import HabitCard from "./HabitCard";
import { Collapsible } from "@/components/ui/collapsible";
import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Input } from "./ui/input";
import { getCurrentDateString } from "@/util/date_utils";

export default function MainTab() {
  const { habits, setHabits } = useHabits();
  const [helpOpen, setHelpOpen] = useState(false);
  const [dateString, setDateString] = useState(getCurrentDateString());

  return (
    <div className="flex flex-col items-center space-y-3 ">
      <h1 className="text-4xl text-center">Welcome to Habit Tracker</h1>
      <Collapsible open={helpOpen} onOpenChange={setHelpOpen}>
        <CollapsibleTrigger asChild>
          <Button size='icon'>
            <HelpCircle />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          
        </CollapsibleContent>
      </Collapsible>

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