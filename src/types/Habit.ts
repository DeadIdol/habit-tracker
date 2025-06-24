// Define types

enum Day {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export interface Resolution {
  title: string;
  description?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}


enum Outcome {
  RESOLUTION_VIOLATED = -1,
  NOT_DONE = 0,
  DONE = 1
}

export default interface Habit {
  id: number; 
  title: string;
  description?: string;
  log: Record<string, Outcome>; // key: date string (e.g. '2025-06-16'), value: Outcome
  resolutions: Resolution[]
};

export const defaultHabits: Habit[] = [
  {
    id: 1,
    title: "Drink water",
    description: "8 glasses per day",
    log: {
      "2025-06-14": Outcome.DONE,
      "2025-06-15": Outcome.NOT_DONE,
      "2025-06-16": Outcome.DONE
    },
    resolutions: []
  },
  {
    id: 2,
    title: "Read 20 mins",
    description: "",
    log: {
      "2025-06-15": Outcome.DONE,
      "2025-06-16": Outcome.DONE
    },
    resolutions: [],
  },
  {
    id: 3,
    title: 'Take Meds',
    description: 'Is Done if I take a total of 6 to 8 pills in the day. Should ideally be 4 on wakeup, 4 at midday.',
    log: {},
    resolutions: [{
      title: 'Every Weekday',
      description: 'Exception if I work at Coles on a weekday. Manually deactivate this goal for long tolerance breaks.',
      isActive: true
    }]

  }
]


interface ProgrammaticGoal {
  title: string;
  numBreakDaysPerWeek?: number;
  specificBreakDays?: Day[];
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}