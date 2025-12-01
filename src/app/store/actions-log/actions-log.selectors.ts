// COMPONENT TYPE: Store - Selectors
// SECTION: State Management - Actions Log
//
// ROLE:
// - Provide access to actions log for display
// - Support educational visibility of dispatched actions
//
// PATTERNS USED:
// - Feature selector for root access
// - Simple selector for log array
//
// NOTES FOR CONTRIBUTORS:
// - Only two selectors needed (state and logs)
// - Logs are already ordered (newest first)
// - This is for educational demos only

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionsLogState } from './actions-log.state';

export const selectActionsLogState =
  createFeatureSelector<ActionsLogState>('actionsLog');

export const selectLogs = createSelector(
  selectActionsLogState,
  (state) => state.logs
);
