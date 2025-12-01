// COMPONENT TYPE: Store - Selectors
// SECTION: State Management - Todo
//
// ROLE:
// - Provide memoized access to todo state slices
// - Compute derived values (filtered todos, counts)
// - Compose selectors for complex queries
// - Demonstrate selector composition pattern
//
// PATTERNS USED:
// - Feature selector for root access
// - Simple selectors for direct state properties
// - Derived selectors composing multiple inputs
// - Memoization prevents unnecessary recalculations
//
// NOTES FOR CONTRIBUTORS:
// - Derived selectors (like selectFilteredTodos) only recompute when inputs change
// - Compose selectors to build complex queries from simple ones
// - Keep selector logic pure (no side effects)
// - Use selectors for filtering, sorting, aggregation

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

// Feature selector: root access to todo state
export const selectTodoState = createFeatureSelector<TodoState>('todo');

// Base selectors: extract direct properties
export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectFilter = createSelector(
  selectTodoState,
  (state) => state.filter
);

// Derived selector: filter todos based on current filter
// Composes two selectors (todos + filter)
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

// Computed selectors: aggregate values
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
