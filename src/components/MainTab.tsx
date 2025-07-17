import { useHabits } from "@/context/HabitContext"
import DraggableHabitCard from "./DraggableHabitCard"
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getCurrentDateString } from "@/util/date_utils";
import Habit from "@/types/Habit";
import update from 'immutability-helper'

export default function MainTab() {
  const { habits, setHabits } = useHabits();
  const [dateString, setDateString] = useState(getCurrentDateString());

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setHabits((prevHabits: Habit[]) =>
      update(prevHabits, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevHabits[dragIndex] as Habit],
        ],
      }),
    )
  }, [])

  const renderCard = useCallback(
    (habit: Habit, index: number) => {
      return (
        <DraggableHabitCard
          id={habit.id}
          habit={habit}
          key={habit.id}
          index={index}
          date={dateString}
          moveCard={moveCard}
        />
      )
    }, [dateString, moveCard])

  return (
    <div className="flex flex-col items-center space-y-3 ">
      <Input type='date' value={dateString} onChange={(e) => setDateString(e.target.value)} className="w-min"></Input>
      <Button
        onClick={() => {
          setHabits(
            [
              {
                id: crypto.randomUUID(),
                title: "",
                description: "",
                resolutions: [],
                log: {}
              },

              ...habits]
          )
        }}
      >New Habit</Button>
      <div>
        {habits.map((habit, i) => (
          renderCard(habit, i)
        ))}
      </div>
    </div>
  )
}