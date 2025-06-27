import { useHabits } from "@/context/HabitContext"
import { getCurrentDateString, getWeekDateStrings } from "@/util/date_utils"
import { Outcome } from "@/types/Habit"
import { useState } from "react"
import { Input } from "./ui/input"



export default function StatsTab() {
  const { habits } = useHabits();
  const [dateString, setDateString] = useState(getCurrentDateString());
  const weekDateStrings: string[] = getWeekDateStrings(dateString)

  return (
    <div className="w-full space-y-4 mt-4">
      <Input type='date' value={dateString} onChange={(e) => setDateString(e.target.value)} className="w-min justify-self-center"></Input>
      <div className="grid grid-cols-8 ">
        <span className="col-start-2">Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
        <span>Sunday</span>
        {habits.map((h) => {
          return (
            <div className="col-span-8 grid grid-cols-subgrid" key={h.id}>
              <span>{h.title}</span>
              {weekDateStrings.map((date) => {
                return (
                  <span
                    className={`${h.log[date] === Outcome.DONE && 'bg-green-500'} 
                                ${h.log[date] === Outcome.NOT_DONE && 'bg-amber-500'} 
                                ${h.log[date] === Outcome.RESOLUTION_VIOLATED && 'bg-red-500'}
                                ${h.log[date] === Outcome.NA && 'bg-gray-500'}
                                `}
                    key={date}
                  >
                  </span>
                )
              })}
            </div>

          )
        })}

      </div>

    </div>
  )
}