import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectFilter = createSelector(
  selectTodoState,
  (state) => state.filter
);

export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectFilter,
  (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }
);

export const selectActiveTodosCount = createSelector(
  selectAllTodos,
  (todos) => todos.filter((t) => !t.completed).length
);

export const selectCompletedTodosCount = createSelector(
  selectAllTodos,
  (todos) => todos.filter((t) => t.completed).length
);

export const selectTodoStateFull = createSelector(
  selectTodoState,
  (state) => state
);
