
export interface Resolution {
  title: string;
  description?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export enum Outcome {
  DONE = 'Done',
  NOT_DONE = 'Not done',
  RESOLUTION_VIOLATED = 'Resolution violated',
  NA = 'Not applicable',
}

export const outcomeVals = Object.values(Outcome);

export const outcomeColorMap = {
  'Done': 'green',
  'Not done': 'amber',
  'Resolution violated': 'red',
  'Not applicable': 'gray'
}

export const outcomeColorMapPale: Record<Outcome, string> = {
  [Outcome.DONE]: 'bg-green-100',
  [Outcome.NOT_DONE]: 'bg-amber-100',
  [Outcome.RESOLUTION_VIOLATED]: 'bg-red-100',
  [Outcome.NA]: 'bg-gray-100'
}

export const outcomeColorMapBold: Record<Outcome, string> = {
  [Outcome.DONE]: 'bg-green-500 hover:bg-green-700',
  [Outcome.NOT_DONE]: 'bg-amber-500 hover: bg-amber-700',
  [Outcome.RESOLUTION_VIOLATED]: 'bg-red-500 hover:bg-red-700',
  [Outcome.NA]: 'bg-gray-500 hover:bg-gray-700'
}

export const altMap: Record<Outcome, string> = {
  [Outcome.DONE]: 'bg-green-100',
  [Outcome.NOT_DONE]: 'amber',
  [Outcome.RESOLUTION_VIOLATED]: 'red',
  [Outcome.NA]: 'gray'
}

// export const outcomeColorMap: Record<Outcome, string> = {
//   [Outcome.DONE]: 'green',
//   [Outcome.NOT_DONE]: 'amber',
//   [Outcome.RESOLUTION_VIOLATED]: 'red',
//   [Outcome.NA]: 'gray'
// }

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