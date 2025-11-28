import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionsLogState } from './actions-log.state';

export const selectActionsLogState =
  createFeatureSelector<ActionsLogState>('actionsLog');

export const selectLogs = createSelector(
  selectActionsLogState,
  (state) => state.logs
);
