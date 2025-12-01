// COMPONENT TYPE: Store - Reducer
// SECTION: State Management - Counter
//
// ROLE:
// - Handle counter actions and update state immutably
// - Define how each action transforms the state
// - Maintain state consistency and history
//
// PATTERNS USED:
// - NgRx createReducer with on() handlers
// - Immutable state updates (spread operator, array spreading)
// - Pure functions (no side effects)
// - Initial state from counter.state.ts
//
// NOTES FOR CONTRIBUTORS:
// - NEVER mutate state directly, always return new objects
// - Use spread operators for shallow copies: { ...state }
// - Use array spread for arrays: [...array, newItem]
// - Each on() handler should be a pure function
// - Keep reducer logic simple (complex logic belongs in effects)

import { createReducer, on } from '@ngrx/store';
import { CounterState, initialCounterState } from './counter.state';
import * as CounterActions from './counter.actions';

export const counterReducer = createReducer(
  initialCounterState,
  on(CounterActions.increment, (state) => ({
    ...state,
    count: state.count + 1,
    history: [...state.history, state.count + 1],
  })),
  on(CounterActions.decrement, (state) => ({
    ...state,
    count: state.count - 1,
    history: [...state.history, state.count - 1],
  })),
  on(CounterActions.reset, () => initialCounterState)
);
