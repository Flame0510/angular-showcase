export interface CounterState {
  count: number;
  history: number[];
}

export const initialCounterState: CounterState = {
  count: 0,
  history: [0],
};
