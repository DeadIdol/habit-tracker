import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { ChevronsUpDown, Trash2, Check, X } from "lucide-react"
import Habit, { Outcome } from "@/types/Habit"
import { useHabits } from "@/context/HabitContext"

interface HabitCardProps {
  id: string
  habit: Habit,
  key: number | string,
  date: string
}

export default function HabitCard({ id, habit, date }: HabitCardProps) {
  const { habits, setHabits } = useHabits();
  const [isOpen, setIsOpen] = useState(true);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  //Effects to auto-expand editable text areas
  useEffect(() => {
    if (descRef.current) {
      descRef.current.style.height = "auto";
      descRef.current.style.height = descRef.current.scrollHeight + "px";
    }
  }, [habit.description, isOpen]);
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [habit.title, isOpen]);

  function handleLogOutcome(outcome: Outcome) {
    setHabits(habits.map((h) => {
      if (h.id === id) {
        return {
          ...h,
          log: { ...h.log, [date]: outcome }
        }
      }
      else {
        return h
      }
    }))
  }

  return (
    <div className="flex flex-row">
      <div className={`border rounded-md rounded-r-none *:p-2 w-md
                      ${habit.log[date] === Outcome.DONE && 'bg-green-100'} 
                      ${habit.log[date] === Outcome.NOT_DONE && 'bg-amber-100'} 
                      ${habit.log[date] === Outcome.RESOLUTION_VIOLATED && 'bg-red-100'} 
                      ${habit.log[date] === Outcome.NA && 'bg-gray-100'} 
        `}>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          { /* Card Header */}
          <div className="flex justify-center items-start">

            {/* Habit Title */}
            <textarea className="text-3xl font-bold resize-none"
              value={habit.title}
              placeholder="Add Title"
              ref={titleRef}
              onChange={e => setHabits(habits.map(h => {
                if (h.id === id) {
                  return {
                    ...h,
                    title: e.target.value
                  }
                }
                else {
                  return h;
                }
              }))}
            />

            {/* Delete Habit Button */}
            <Button variant="ghost" size="icon" className="size-8 "
              onClick={() => {
                setHabits(habits.filter(h => h.id !== id))
              }}>
              <Trash2 />
              <span className="sr-only">Delete Habit</span>
            </Button>

            {/* Collapse Card Button */}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="s">
                <ChevronsUpDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          { /* Card content, collapsible */}
          <CollapsibleContent>
            <textarea
              className="w-full resize-none"
              value={habit.description}
              placeholder="Add description"
              ref={descRef}
              onChange={e => {
                setHabits(habits.map(h => {
                  if (h.id === id) {
                    return { ...h, description: e.target.value }
                  }
                  else {
                    return h
                  }
                }))
              }}

            />
          </CollapsibleContent>
        </Collapsible>
      </div>
      {/* Outcome Logging Buttons */}
      <div className="flex flex-col">
        <Button variant="ghost" size={habit.log[date] === Outcome.DONE ? 'lg' : 'icon'} className="bg-green-500 hover:bg-green-700 rounded-l-none"
          onClick={() => handleLogOutcome(Outcome.DONE)}
        >
          <Check />
          <span className="sr-only">Record Habit Done</span>
        </Button>
        <Button variant="ghost" size={habit.log[date] === Outcome.NOT_DONE ? 'lg' : 'icon'} className="bg-amber-500 hover:bg-amber-700 rounded-l-none"
          onClick={() => handleLogOutcome(Outcome.NOT_DONE)}
        >
          <X />
          <span className="sr-only">Record Habit Not Done</span>
        </Button>
        <Button variant="ghost" size={habit.log[date] === Outcome.RESOLUTION_VIOLATED ? 'lg' : 'icon'} className="bg-red-500 hover:bg-red-700 rounded-l-none"
          onClick={() => handleLogOutcome(Outcome.RESOLUTION_VIOLATED)}
        >
          <X />
          <span className="sr-only">Record Habit Not Done and Resolution Violated</span>
        </Button>
        <Button variant="ghost" size={habit.log[date] === Outcome.NA ? 'lg' : 'icon'} className="bg-gray-500 hover:bg-gray-700 rounded-l-none"
          onClick={() => handleLogOutcome(Outcome.NA)}
        >

          <span className="sr-only">Record Not Applicable</span>
        </Button>
      </div>
    </div>

  )
}