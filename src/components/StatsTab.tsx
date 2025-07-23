import { useHabits } from "@/context/HabitContext"
import { getCurrentDateString, getWeekDateStrings } from "@/util/date_utils"
import { Outcome } from "@/types/Habit"
import { useState, useRef, useEffect } from "react"
import { Input } from "./ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



export default function StatsTab() {
  const { habits, setOutcome } = useHabits();
  const [dateString, setDateString] = useState(getCurrentDateString());
  const weekDateStrings: string[] = getWeekDateStrings(dateString)

  // For popup state
  const [popup, setPopup] = useState<{
    habitId: string;
    date: string;
    anchor: HTMLElement | null;
  } | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popup) return;
    function handleClick(e: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node)
      ) {
        setPopup(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [popup]);

  return (
    <div className="w-full space-y-4 mt-4 relative">
      <Input type='date' value={dateString} onChange={(e) => setDateString(e.target.value)} className="w-min justify-self-center" />
      <div className="grid grid-cols-8 ">
        <span className="col-start-2 border-x ">Monday</span>
        <span className="border-x">Tuesday</span>
        <span className="border-x">Wednesday</span>
        <span className="border-x">Thursday</span>
        <span className="border-x">Friday</span>
        <span className="border-x">Saturday</span>
        <span className="border-x">Sunday</span>
        <div className="col-span-8 grid grid-cols-subgrid">
          <span></span>
          {weekDateStrings.map((d) => (<span key={d} className="border-x">{d}</span>))}
        </div>
        {habits.map((h) => (
          <div className="col-span-8 grid grid-cols-subgrid" key={h.id}>
            <span className="border-y truncate" title={h.title}>{h.title}</span>
            {weekDateStrings.map((date) => {
              const outcome = h.log[date];
              return (
                <span
                  className={`cursor-pointer ${outcome === Outcome.DONE ? 'bg-green-500' : ''}
                    ${outcome === Outcome.NOT_DONE ? 'bg-amber-500' : ''}
                    ${outcome === Outcome.RESOLUTION_VIOLATED ? 'bg-red-500' : ''}
                    ${outcome === Outcome.NA ? 'bg-gray-500' : ''}
                    border`}
                  key={date}
                  onClick={(e) => setPopup({ habitId: h.id, date, anchor: e.currentTarget })}
                  title="Click to change outcome"
                >
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Popup for outcome selection */}
      {popup && (
        <div
          ref={popupRef}
          className="border rounded-md bg-white flex"
          style={{
            position: 'absolute',
            left: popup.anchor?.offsetLeft ?? 0,
            top: (popup.anchor?.offsetTop ?? 0) + (popup.anchor?.offsetHeight ?? 0),
            zIndex: 10,
          }}
        >
          {([
            Outcome.DONE,
            Outcome.NOT_DONE,
            Outcome.RESOLUTION_VIOLATED,
            Outcome.NA,
          ] as Outcome[]).map((outcome) => {
            const color =
              outcome === Outcome.DONE ? 'bg-green-500'
              : outcome === Outcome.NOT_DONE ? 'bg-amber-500'
              : outcome === Outcome.RESOLUTION_VIOLATED ? 'bg-red-500'
              : 'bg-gray-500';
            return (
              <button
                key={outcome}
                className={`w-8 h-8 rounded-full border ${color}`}
                title={String(outcome).replace('_', ' ')}
                onClick={() => {
                  setOutcome(popup.habitId, popup.date, outcome);
                  setPopup(null);
                }}
              />
            );
          })}
          <button
            className="ml-2 px-2 py-1 border rounded text-xs"
            onClick={() => setPopup(null)}
          >Cancel</button>
        </div>
      )}
    </div>
  );
}