// COMPONENT TYPE: Store - State
// SECTION: State Management - Counter
//
// ROLE:
// - Define counter feature state shape
// - Provide initial state values
// - Serve as single source of truth for counter structure
//
// PATTERNS USED:
// - TypeScript interface for state shape
// - Exported initial state for reducer initialization
// - Immutable state structure
//
// NOTES FOR CONTRIBUTORS:
// - Keep state shape flat and simple
// - All state properties should be serializable (no functions, classes)
// - Update initial state when adding new properties
// - Document each property's purpose if non-obvious

export interface CounterState {
  count: number; // Current counter value
  history: number[]; // Array of all counter values over time
}

export const initialCounterState: CounterState = {
  count: 0,
  history: [0],
};
