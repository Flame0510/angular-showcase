// COMPONENT TYPE: Store - Actions
// SECTION: State Management - Actions Log
//
// ROLE:
// - Provide action to clear the actions log
// - Support educational log visibility feature
//
// PATTERNS USED:
// - Simple action without payload
//
// NOTES FOR CONTRIBUTORS:
// - This feature is for educational demos only
// - Logging is handled in the reducer by listening to other actions
// - Only clearLogs action is explicitly defined here

import { createAction } from '@ngrx/store';

export const clearLogs = createAction('[Actions Log] Clear Logs');
