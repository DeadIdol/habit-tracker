import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useState } from "react"
import { Button } from "./ui/button"
import { ChevronsUpDown, SquarePen, Trash2 } from "lucide-react"
import Habit from "@/types/Habit"
import { useHabits } from "@/context/HabitContext"

interface HabitCardProps {
  habit: Habit,
  key: number | string
}

export default function HabitCard({ habit }: HabitCardProps) {
  const { habits, setHabits } = useHabits();
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="bg-white border rounded-md p-2">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        { /* Card Header */}
        <div className="flex">
          {/* Habit Title */}
          <h1 className="text-2xl">{habit.title}</h1>

          {/* Edit Habit Button */}
          <Button variant="ghost" size="icon" className="size-8">
            <SquarePen />
            <span className="sr-only">Edit Habit</span>
          </Button>

          {/* Delete Habit Button */}
          <Button variant="ghost" size="icon" className="size-8"
            onClick={() => {
              setHabits(habits.filter(h => h.id !== habit.id))
            }}>
            <Trash2 />
            <span className="sr-only">Delete Habit</span>
          </Button>

          {/* Collapse Card Button */}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        { /* Card content, collapsible */}
        <CollapsibleContent>
          <p>{habit.notes}</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}