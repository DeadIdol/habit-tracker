import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useState } from "react"
import { Button } from "./ui/button"
import { ChevronsUpDown, SquarePen, Trash2, Check, X } from "lucide-react"
import Habit from "@/types/Habit"
import { useHabits } from "@/context/HabitContext"

interface HabitCardProps {
  habit: Habit,
  key: number | string,
  date: Date,
}

export default function HabitCard({ habit }: HabitCardProps) {
  const { habits, setHabits } = useHabits();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-row">

      <div className="bg-white border rounded-md rounded-r-none *:p-2 w-md">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          { /* Card Header */}
          <div className="flex justify-center items-start">

            {/* Habit Title */}
            <textarea className="text-3xl font-bold w-min" 
              value={habit.title}
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
            <textarea defaultValue={habit.description}></textarea>
            <h2 className="text-2xl">Resolutions:</h2>

            {habit.resolutions ? habit.resolutions.map((r, index) => {
              return (
                <div key={index}>
                  <h3 className="text-lg *:font-bold">{r.title}</h3>
                  {r.description}
                </div>
              )
            }) : <></>}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Daily Check Options */}
      <div className="flex flex-col">
        <Button variant="ghost" size="icon" className="bg-green-500 hover:bg-green-700 rounded-l-none"
          onClick={() => {
            setHabits(habits.map((h) => {
              if (h.id === habit.id) {
                return {
                  ...habit,
                  // log: {...log, }
                }
              }
              else {
                return h
              }
            }))
          }}
        >
          <Check />
          <span className="sr-only">Record Habit Done</span>
        </Button>
        <Button variant="ghost" size="icon" className="bg-amber-500 hover:bg-amber-700 rounded-l-none">
          <X />
          <span className="sr-only">Record Habit Not Done</span>
        </Button>
        <Button variant="ghost" size="icon" className="bg-red-500 hover:bg-red-700 rounded-l-none">
          <X />
          <span className="sr-only">Record Habit Not Done and Resolution Violated</span>
        </Button>
      </div>
    </div>

  )
}