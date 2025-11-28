import { createReducer, on } from '@ngrx/store';
import { ActionsLogState, initialActionsLogState } from './actions-log.state';
import * as ActionsLogActions from './actions-log.actions';
import * as CounterActions from '../counter/counter.actions';
import * as TodoActions from '../todo/todo.actions';

export const actionsLogReducer = createReducer(
  initialActionsLogState,
  // Counter actions
  on(CounterActions.increment, (state) => ({
    logs: ['INCREMENT', ...state.logs].slice(0, 10),
  })),
  on(CounterActions.decrement, (state) => ({
    logs: ['DECREMENT', ...state.logs].slice(0, 10),
  })),
  on(CounterActions.reset, (state) => ({
    logs: ['RESET', ...state.logs].slice(0, 10),
  })),
  // Todo actions
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
