// COMPONENT TYPE: Store - Selectors
// SECTION: State Management - Counter
//
// ROLE:
// - Provide efficient, memoized access to counter state slices
// - Compose and derive values from base state
// - Prevent unnecessary re-renders with memoization
//
// PATTERNS USED:
// - createFeatureSelector for feature state root
// - createSelector for memoized state slices
// - Selector composition (deriving from other selectors)
// - Pure functions for state transformation
//
// NOTES FOR CONTRIBUTORS:
// - Selectors are memoized: only recompute when input changes
// - Start with feature selector, compose others from it
// - Keep selectors simple (single responsibility)
// - Use selectors for derived/computed values
// - Never mutate state in selectors

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

// Feature selector: root access to counter state slice
export const selectCounterState = createFeatureSelector<CounterState>('counter');

// Derived selectors: extract specific properties
export const selectCount = createSelector(
  selectCounterState,
  (state) => state.count
);

export const selectHistory = createSelector(
  selectCounterState,
  (state) => state.history
);

export const selectCounterFull = createSelector(
  selectCounterState,
  (state) => state
);
