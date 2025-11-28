import { createReducer, on } from '@ngrx/store';
import { TodoState, initialTodoState } from './todo.state';
import * as TodoActions from './todo.actions';

export const todoReducer = createReducer(
  initialTodoState,
  on(TodoActions.addTodo, (state, { text }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ],
  })),
  on(TodoActions.toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  on(TodoActions.deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  on(TodoActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),
  on(TodoActions.clearCompleted, (state) => ({
    ...state,
    todos: state.todos.filter((todo) => !todo.completed),
  }))
);
