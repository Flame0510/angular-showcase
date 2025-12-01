// COMPONENT TYPE: Store - Root Reducer
// SECTION: State Management - Application Reducers
//
// ROLE:
// - Combine all feature reducers into single reducer map
// - Register feature reducers with NgRx Store
// - Map state keys to their respective reducers
//
// PATTERNS USED:
// - ActionReducerMap for centralized reducer registration
// - Feature reducer composition
//
// NOTES FOR CONTRIBUTORS:
// - Add new feature reducers here when creating new store slices
// - Keys must match AppState interface keys exactly
// - Import reducers from feature folders
// - Used in app.config.ts: provideStore(appReducers)

import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { counterReducer } from './counter/counter.reducer';
import { todoReducer } from './todo/todo.reducer';
import { actionsLogReducer } from './actions-log/actions-log.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
  todo: todoReducer,
  actionsLog: actionsLogReducer,
};
