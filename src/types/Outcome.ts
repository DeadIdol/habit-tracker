export enum Outcome {
  DONE = 'Done',
  NOT_DONE = 'Not done',
  RESOLUTION_VIOLATED = 'Resolution violated',
  NA = 'Not applicable',
}

export const outcomeVals = Object.values(Outcome);

export const outcomeColorMapPale: Record<Outcome, string> = {
  [Outcome.DONE]: 'bg-green-100',
  [Outcome.NOT_DONE]: 'bg-amber-100',
  [Outcome.RESOLUTION_VIOLATED]: 'bg-red-100',
  [Outcome.NA]: 'bg-gray-100'
}

export const outcomeColorMapBold: Record<Outcome, string> = {
  [Outcome.DONE]: 'bg-green-500 hover:bg-green-700',
  [Outcome.NOT_DONE]: 'bg-amber-500 hover:bg-amber-700',
  [Outcome.RESOLUTION_VIOLATED]: 'bg-red-500 hover:bg-red-700',
  [Outcome.NA]: 'bg-gray-500 hover:bg-gray-700'
}