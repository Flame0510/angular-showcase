// COMPONENT TYPE: Store - State
// SECTION: State Management - Todo
//
// ROLE:
// - Define todo feature state shape with entities and filter
// - Provide initial state with example todos
// - Serve as single source of truth for todo structure
//
// PATTERNS USED:
// - Entity interface (Todo) for typed array items
// - State interface with entities array and UI state (filter)
// - Exported initial state with demo data
//
// NOTES FOR CONTRIBUTORS:
// - Keep Todo interface simple and serializable
// - Filter type is union for type safety
// - Initial todos are for demonstration purposes
// - Consider adding createdAt timestamp for real apps

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

export const initialTodoState: TodoState = {
  todos: [
    { id: 1, text: 'Learn NgRx', completed: false },
    { id: 2, text: 'Create a store', completed: true },
    { id: 3, text: 'Implement actions', completed: false },
  ],
  filter: 'all',
};
