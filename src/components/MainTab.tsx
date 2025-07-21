import { useHabits } from "@/context/HabitContext"
import HabitCard from "./HabitCard";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { reorder } from "@/lib/dnd_utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getCurrentDateString } from "@/util/date_utils";

export default function MainTab() {
  const { habits, setHabits } = useHabits();
  const [dateString, setDateString] = useState(getCurrentDateString());

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    setHabits(reorder(habits, result.source.index, result.destination.index));
  };

  return (
    <div className="flex flex-col items-center space-y-3 ">
      <Input type='date' value={dateString} onChange={(e) => setDateString(e.target.value)} className="w-min" />
      <Button
        onClick={() => {
          setHabits([
            {
              id: crypto.randomUUID(),
              title: "",
              description: "",
              resolutions: [],
              log: {}
            },
            ...habits
          ])
        }}
      >New Habit</Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="habits-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="w-full flex flex-col items-center space-y-3">
              {habits.map((habit, index) => (
                <Draggable key={habit.id} draggableId={habit.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="w-full"
                    >
                      <HabitCard
                        key={habit.id}
                        habit={habit}
                        date={dateString}
                        dragHandleProps={provided.dragHandleProps ?? undefined}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}