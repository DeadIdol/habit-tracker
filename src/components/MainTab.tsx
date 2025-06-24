import { useHabits } from "@/context/HabitContext"
import HabitCard from "./HabitCard";
import { Collapsible } from "@/components/ui/collapsible";
import { useState } from "react";
import { MessageCircleQuestion, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Input } from "./ui/input";

export default function MainTab() {
  const { habits } = useHabits();
  const [helpOpen, setHelpOpen] = useState(false);
  const [dateString, setDateString] = useState("");
  console.log(dateString)

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate); // e.g., "2025-06-14"

  console.log(`using toLocaleDateString ${date.toLocaleDateString()}`)

  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-4xl">Welcome to Habit Tracker</h1>
      <Collapsible open={helpOpen} onOpenChange={setHelpOpen}>
        <CollapsibleTrigger asChild>
          <Button size='icon'>
            <HelpCircle />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>This app is for recording your daily habits. At the end of each day, you click the green check if you've done the habit, and the amber X if you have not. (The red X is for resolutions, which we will address shortly). In the statistics tab, you can see which habits you did each day. The app is designed assuming all habits have a positive valence. So for example, instead of creating a habit ‘Scroll twitter’ create ‘Don’t scroll twitter’. This will make the statistics intuitive: The more green you see, the better. However, habits are not necessarily things you are aiming to do every day. For that, we have Resolutions.
            A Resolution is simply any rule you are trying to stick to for a habit. For example, on the ‘Read 20m’ habit, you could create a resolution ‘Every weekday’.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <Input type='date' onChange={(e) => setDateString(e.target.value)}></Input>

      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} date={date} />
      ))}

    </div>
  )
}