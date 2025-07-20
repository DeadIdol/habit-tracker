import type { CSSProperties } from 'react'
import { memo, useEffect, useState } from 'react'
import HabitCard from './HabitCard'
import Habit from '@/types/Habit'
import { GripVertical } from 'lucide-react'

const styles: CSSProperties = {
  display: 'inline-block',
}

interface CardDragPreviewProps {
  id: string,
  habit: Habit
  date: string
}

export default function CardDragPreview({ id, habit, date }: CardDragPreviewProps) {
  return (
    <div className="flex flex-row" style={styles}>
      <button
        className={`border rounded-md w-6 place-content-center`}
      >
        <GripVertical />
      </button>
      <HabitCard
        id={id}
        habit={habit}
        date={date}
      />
    </div>
  )

}