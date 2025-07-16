import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import type { Identifier, XYCoord } from "dnd-core"
import { ItemTypes } from "@/types/ItemTypes"
import Habit from "@/types/Habit"
import HabitCard from "./HabitCard"
import { GripVertical } from "lucide-react"

interface DraggableHabitCardProps {
  id: string
  habit: Habit
  key: number | string
  date: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export default function DraggableHabitCard({ id, habit, key, date, index, moveCard }: DraggableHabitCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLButtonElement>(null)

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.HABIT_CARD,
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ItemTypes.HABIT_CARD,
    item: () => ({ id, index }),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drop(ref)
  drag(handleRef)
  dragPreview(ref)

  return (
    <div className="flex flex-row" style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <button
        ref={handleRef}
        className={`border rounded-md w-6 place-content-center ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <GripVertical />
      </button>
      <HabitCard
        id={id}
        habit={habit}
        key={key}
        date={date}
      />
    </div>
  )
}
