import { useHabits } from "@/context/HabitContext"
import DraggableHabitCard from "./DraggableHabitCard"
import HabitCard from "./HabitCard"
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getCurrentDateString } from "@/util/date_utils";
import Habit from "@/types/Habit";

import update from 'immutability-helper'
import { Preview } from 'react-dnd-preview'
import { ItemTypes } from "@/types/ItemTypes";
import { GripVertical } from "lucide-react";



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
      <Preview generator={({itemType, item, style}) => {
        if (itemType !== ItemTypes.HABIT_CARD) return null
        console.log('preview generated')
        return (
          <div style={{...style, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", background: "white", borderRadius: 8, padding: 0, margin: 0}}>
            <div className="flex flex-row">
              <button
                className="border rounded-md w-6 place-content-center cursor-grabbing"
                style={{marginRight: 0}}
              >
                <GripVertical />
              </button>
              <HabitCard
                id={item.id}
                habit={habits[item.index]}
                key={item.id}
                date={dateString}
              />
            </div>
          </div>
        )
      }} />
    </div>
  )
}