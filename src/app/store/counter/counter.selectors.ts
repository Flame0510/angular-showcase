import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

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
