// COMPONENT TYPE: Store - Barrel Export
// SECTION: State Management - Store Index
//
// ROLE:
// - Re-export all store modules from single entry point
// - Simplify imports in components (import from 'store' not 'store/counter/counter.actions')
// - Provide convenient access to all store artifacts
//
// PATTERNS USED:
// - Barrel export pattern
// - Grouped re-exports by feature
//
// NOTES FOR CONTRIBUTORS:
// - Add new feature exports here when creating new store slices
// - Group exports by feature for clarity
// - Export state, actions, reducers, and selectors for each feature
// - This allows: import { increment, selectCount } from 'store'

// Counter
export * from './counter/counter.state';
export * from './counter/counter.actions';
export * from './counter/counter.reducer';
export * from './counter/counter.selectors';

// Todo
export * from './todo/todo.state';
export * from './todo/todo.actions';
export * from './todo/todo.reducer';
export * from './todo/todo.selectors';

// Actions Log
export * from './actions-log/actions-log.state';
export * from './actions-log/actions-log.actions';
export * from './actions-log/actions-log.reducer';
export * from './actions-log/actions-log.selectors';

// App
export * from './app.state';
export * from './app.reducers';
