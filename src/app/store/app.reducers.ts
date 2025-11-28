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
