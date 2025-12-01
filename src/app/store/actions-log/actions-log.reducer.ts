// COMPONENT TYPE: Store - Reducer
// SECTION: State Management - Actions Log
//
// ROLE:
// - Listen to ALL actions from other features (counter, todo)
// - Log action names and payloads for educational visibility
// - Limit log size to prevent memory issues
//
// PATTERNS USED:
// - Cross-feature action listening (reducer reacts to other feature actions)
// - Array prepend with slice for FIFO behavior
// - Educational logging as alternative to Redux DevTools
//
// NOTES FOR CONTRIBUTORS:
// - This demonstrates that ANY reducer can listen to ANY action
// - Logs are limited to 10 entries (.slice(0, 10))
// - Format: 'ACTION_NAME (payload)' for actions with data
// - This is for demos only, not production pattern

import { createReducer, on } from '@ngrx/store';
import { ActionsLogState, initialActionsLogState } from './actions-log.state';
import * as ActionsLogActions from './actions-log.actions';
import * as CounterActions from '../counter/counter.actions';
import * as TodoActions from '../todo/todo.actions';

export const actionsLogReducer = createReducer(
  initialActionsLogState,
  // Counter actions logging
  on(CounterActions.increment, (state) => ({
    logs: ['INCREMENT', ...state.logs].slice(0, 10),
  })),
  on(CounterActions.decrement, (state) => ({
    logs: ['DECREMENT', ...state.logs].slice(0, 10),
  })),
  on(CounterActions.reset, (state) => ({
    logs: ['RESET', ...state.logs].slice(0, 10),
  })),
  // Todo actions logging
  on(TodoActions.addTodo, (state, { text }) => ({
    logs: [`ADD_TODO (${text})`, ...state.logs].slice(0, 10),
  })),
  on(TodoActions.toggleTodo, (state, { id }) => ({
    logs: [`TOGGLE_TODO (${id})`, ...state.logs].slice(0, 10),
  })),
  on(TodoActions.deleteTodo, (state, { id }) => ({
    logs: [`DELETE_TODO (${id})`, ...state.logs].slice(0, 10),
  })),
  on(TodoActions.setFilter, (state, { filter }) => ({
    logs: [`SET_FILTER (${filter})`, ...state.logs].slice(0, 10),
  })),
  on(TodoActions.clearCompleted, (state) => ({
    logs: ['CLEAR_COMPLETED', ...state.logs].slice(0, 10),
  })),
  // Clear logs
  on(ActionsLogActions.clearLogs, () => initialActionsLogState)
);
