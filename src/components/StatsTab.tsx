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
        <span className="col-start-2 border-x">Monday</span>
        <span className="border-x">Tuesday</span>
        <span className="border-x">Wednesday</span>
        <span className="border-x">Thursday</span>
        <span className="border-x">Friday</span>
        <span className="border-x">Saturday</span>
        <span className="border-x">Sunday</span>
        <div className="col-span-8 grid grid-cols-subgrid">
          <span></span>
          {weekDateStrings.map((d) =>  (<span key={d} className="border-x">{d}</span>)
          )}
        </div>
        {habits.map((h) => {
          return (
            <div className="col-span-8 grid grid-cols-subgrid" key={h.id}>
              <span
                className="border-y truncate"
                title={h.title}
              >
                {h.title}
              </span>
              {weekDateStrings.map((date) => {
                return (
                  <span
                    className={`${h.log[date] === Outcome.DONE && 'bg-green-500'} 
                                ${h.log[date] === Outcome.NOT_DONE && 'bg-amber-500'} 
                                ${h.log[date] === Outcome.RESOLUTION_VIOLATED && 'bg-red-500'}
                                ${h.log[date] === Outcome.NA && 'bg-gray-500'}
                                border`}
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