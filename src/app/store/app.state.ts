import { CounterState } from './counter/counter.state';
import { TodoState } from './todo/todo.state';
import { ActionsLogState } from './actions-log/actions-log.state';

export interface AppState {
  counter: CounterState;
  todo: TodoState;
  actionsLog: ActionsLogState;
}
