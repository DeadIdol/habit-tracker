// Define types
export default interface Habit {
  id: number; 
  title: string;
  notes?: string;
  log: Record<string, boolean>; // key: date string (e.g. '2025-06-16'), value: habit was/wasn't done
};

export const defaultHabits: Habit[] = [
  {
    "id": 1,
    "title": "Drink water",
    "notes": "8 glasses per day",
    "log": {
      "2025-06-14": true,
      "2025-06-15": false,
      "2025-06-16": true
    }
  },
  {
    "id": 2,
    "title": "Read 20 mins",
    "notes": "",
    "log": {
      "2025-06-15": true,
      "2025-06-16": true
    }
  }
]