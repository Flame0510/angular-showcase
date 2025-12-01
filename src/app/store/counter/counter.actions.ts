// COMPONENT TYPE: Store - Actions
// SECTION: State Management - Counter
//
// ROLE:
// - Define all counter-related actions
// - Provide type-safe action creators
// - Document user interactions and state changes
//
// PATTERNS USED:
// - NgRx createAction for type safety
// - Action naming convention: '[Feature] Action Description'
// - Simple actions without payloads (props)
//
// NOTES FOR CONTRIBUTORS:
// - Use descriptive action names that explain intent
// - Action names format: '[Source/Feature] Action Description'
// - Add props<{ ... }>() for actions that need data
// - Keep actions focused (one responsibility each)

import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
