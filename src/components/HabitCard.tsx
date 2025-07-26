import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { ChevronsUpDown, Trash2, Check, X, GripVertical } from "lucide-react"
import Habit, { Outcome, outcomeVals } from "@/types/Habit"
import { useHabits } from "@/context/HabitContext"
import OutcomeButton from "./OutcomeButton"

// Convert enum to array of values

interface HabitCardProps {
  habit: Habit,
  key: number | string,
  date: string,
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}

export default function HabitCard({ habit, date, dragHandleProps }: HabitCardProps) {
  const { habits, setHabits, setOutcome } = useHabits();
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

  return (
    <div className="flex flex-row">
      {/* Drag handle on the left */}
      <div
        className="flex items-center cursor-grab select-none border rounded-md"
        style={{ minWidth: 24 }}
        aria-label="Drag handle"
        {...dragHandleProps}
      >
        <GripVertical />
      </div>
      <div className={`border rounded-md rounded-r-none *:p-2 w-md
                      bg-${habit.log[date]}-100`}>
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
                if (h.id === habit.id) {
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
                setHabits(habits.filter(h => h.id !== habit.id))
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
                  if (h.id === habit.id) {
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

      {/* Daily Outcome Options */}
      <div className="flex flex-col">
        {outcomeVals.map((outcome) => {
          return (
            <Button variant="ghost" size={habit.log[date] === outcome ? 'lg' : 'icon'} className={`bg-${outcome}-500 hover:bg-${outcome}-700 rounded-l-none`}
              onClick={() => setOutcome(habit.id, date, outcome)}
            >
              {outcome === Outcome.DONE ? <Check /> : <X />}
              <span className="sr-only">Record Habit {outcome}</span>
            </Button>)
        })}
      </div>
    </div>

  )
}