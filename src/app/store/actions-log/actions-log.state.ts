// COMPONENT TYPE: Store - State
// SECTION: State Management - Actions Log
//
// ROLE:
// - Define actions log state for educational visibility
// - Track dispatched actions for learning purposes
// - Provide alternative to Redux DevTools for demos
//
// PATTERNS USED:
// - Simple array-based log structure
// - Empty initial state
//
// NOTES FOR CONTRIBUTORS:
// - This is for educational purposes only
// - Logs are limited to 10 entries in reducer
// - Not needed in production (use Redux DevTools)
// - Consider removing for real applications

export interface ActionsLogState {
  logs: string[];
}

export const initialActionsLogState: ActionsLogState = {
  logs: [],
};
