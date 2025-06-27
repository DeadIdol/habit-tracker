
export interface Resolution {
  title: string;
  description?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export enum Outcome {
  RESOLUTION_VIOLATED,
  NOT_DONE,
  DONE,
  NA
}

export default interface Habit {
  id: string; 
  title: string;
  description: string;
  log: Record<string, Outcome>; // key: date string (e.g. '2025-06-16'), value: Outcome
  resolutions: Resolution[]
};

export const defaultHabits: Habit[] = [
  {
    id: '1',
    title: "Drink water",
    description: "8 glasses per day",
    log: {
    },
    resolutions: []
  },
  {
    id: '2',
    title: "Read 20 mins",
    description: "",
    log: {
    },
    resolutions: [],
  },
  {
    id: '3',
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