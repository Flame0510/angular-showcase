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
    { id: 1, text: 'Imparare NgRx', completed: false },
    { id: 2, text: 'Creare uno store', completed: true },
    { id: 3, text: 'Implementare actions', completed: false },
  ],
  filter: 'all',
};
