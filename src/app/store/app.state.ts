// COMPONENT TYPE: Store - Root State
// SECTION: State Management - Application State
//
// ROLE:
// - Define the root application state shape
// - Compose all feature states into single interface
// - Serve as single source of truth for entire store structure
//
// PATTERNS USED:
// - Centralized state composition
// - Feature state slicing
// - TypeScript interface for type safety
//
// NOTES FOR CONTRIBUTORS:
// - Add new feature states here when creating new store slices
// - Keep feature state keys lowercase (counter, todo, not Counter, Todo)
// - Import feature state interfaces from their respective files
// - This interface is used throughout the app for Store<AppState> typing

import { CounterState } from './counter/counter.state';
import { TodoState } from './todo/todo.state';
import { ActionsLogState } from './actions-log/actions-log.state';

export interface AppState {
  counter: CounterState;
  todo: TodoState;
  actionsLog: ActionsLogState;
}
