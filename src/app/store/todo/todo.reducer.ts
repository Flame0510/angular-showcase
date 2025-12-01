// COMPONENT TYPE: Store - Reducer
// SECTION: State Management - Todo
//
// ROLE:
// - Handle todo CRUD operations immutably
// - Manage filter state changes
// - Demonstrate array manipulation patterns (map, filter, spread)
//
// PATTERNS USED:
// - Immutable array operations (map, filter, spread)
// - Date.now() for simple unique IDs (use UUID in production)
// - Object spread for shallow copies
// - Pattern matching with on() handlers
//
// NOTES FOR CONTRIBUTORS:
// - NEVER mutate arrays directly, use map/filter/spread
// - map() for updates, filter() for deletions, [...array, item] for additions
// - Use Date.now() only for demos (use proper ID generation in production)
// - Each handler returns new state object

import { createReducer, on } from '@ngrx/store';
import { TodoState, initialTodoState } from './todo.state';
import * as TodoActions from './todo.actions';

export const todoReducer = createReducer(
  initialTodoState,
  // Add new todo to end of array
  on(TodoActions.addTodo, (state, { text }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: Date.now(), // Simple ID generation for demo
        text,
        completed: false,
      },
    ],
  })),
  // Toggle completed status using map
  on(TodoActions.toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  // Remove todo using filter
  on(TodoActions.deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  // Update filter state
  on(TodoActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),
  // Remove all completed todos
  on(TodoActions.clearCompleted, (state) => ({
    ...state,
    todos: state.todos.filter((todo) => !todo.completed),
  }))
);
