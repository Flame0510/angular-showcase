// COMPONENT TYPE: Store - Actions
// SECTION: State Management - Todo
//
// ROLE:
// - Define all todo-related actions (CRUD + filter)
// - Provide type-safe action creators with payloads
// - Document user interactions with todo list
//
// PATTERNS USED:
// - NgRx createAction with props<{ ... }>()
// - Action naming convention: '[Feature] Action Description'
// - Typed payloads for data-carrying actions
//
// NOTES FOR CONTRIBUTORS:
// - Actions with data use props<{ key: type }>()
// - Actions without data omit props (like clearCompleted)
// - Keep action names descriptive and verb-based
// - Group related actions (CRUD together, then filter)

import { createAction, props } from '@ngrx/store';

// CRUD Operations
export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ text: string }>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: number }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);

// Filter Management
export const setFilter = createAction(
  '[Todo] Set Filter',
  props<{ filter: 'all' | 'active' | 'completed' }>()
);

export const clearCompleted = createAction('[Todo] Clear Completed');
