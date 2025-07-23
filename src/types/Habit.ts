
export interface Resolution {
  title: string;
  description?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export enum Outcome {
  DONE = 'green',
  NOT_DONE = 'amber',
  RESOLUTION_VIOLATED = 'red',
  NA = 'gray',
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
    title: "Don't use twitter ",
    description: 'Exception allowed on weekends',
    log: {},
    resolutions: [{
      title: 'Every Weekday',
      description: 'Exception if I work at Coles on a weekday. Manually deactivate this goal for long breaks.',
      isActive: true
    }]

  }
]