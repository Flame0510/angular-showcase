import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeader } from '../page-header/page-header';
import { NgrxConcepts } from './ngrx-concepts/ngrx-concepts';
import { NgrxCounterDemo } from './ngrx-counter-demo/ngrx-counter-demo';
import { NgrxTodoDemo } from './ngrx-todo-demo/ngrx-todo-demo';

// Simulazione delle Actions
interface Action {
  type: string;
  payload?: any;
}

// Simulazione dello State
interface CounterState {
  count: number;
  history: number[];
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-ngrx-example',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeader, NgrxConcepts, NgrxCounterDemo, NgrxTodoDemo],
  templateUrl: './ngrx-example.html',
  styleUrls: ['./ngrx-example.scss'],
})
export class NgrxExample {
  // Simulazione dello store per il counter
  counterState = signal<CounterState>({
    count: 0,
    history: [0],
  });

  // Simulazione dello store per i todos
  todoState = signal<TodoState>({
    todos: [
      { id: 1, text: 'Imparare NgRx', completed: false },
      { id: 2, text: 'Creare uno store', completed: true },
      { id: 3, text: 'Implementare actions', completed: false },
    ],
    filter: 'all',
  });

  newTodoText = signal('');
  selectedTab = signal<'counter' | 'todos' | 'concepts'>('concepts');

  // Actions log
  actionsLog = signal<string[]>([]);

  // Computed selectors (simulati)
  get filteredTodos() {
    const state = this.todoState();
    switch (state.filter) {
      case 'active':
        return state.todos.filter((t) => !t.completed);
      case 'completed':
        return state.todos.filter((t) => t.completed);
      default:
        return state.todos;
    }
  }

  get activeTodosCount() {
    return this.todoState().todos.filter((t) => !t.completed).length;
  }

  get completedTodosCount() {
    return this.todoState().todos.filter((t) => t.completed).length;
  }

  // Counter Actions
  increment() {
    this.dispatch({ type: 'INCREMENT' });
    const current = this.counterState().count;
    this.counterState.update((state) => ({
      count: current + 1,
      history: [...state.history, current + 1],
    }));
  }

  decrement() {
    this.dispatch({ type: 'DECREMENT' });
    const current = this.counterState().count;
    this.counterState.update((state) => ({
      count: current - 1,
      history: [...state.history, current - 1],
    }));
  }

  reset() {
    this.dispatch({ type: 'RESET' });
    this.counterState.set({
      count: 0,
      history: [0],
    });
  }

  // Todo Actions
  addTodo() {
    const text = this.newTodoText().trim();
    if (!text) return;

    this.dispatch({ type: 'ADD_TODO', payload: text });
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    this.todoState.update((state) => ({
      ...state,
      todos: [...state.todos, newTodo],
    }));
    this.newTodoText.set('');
  }

  toggleTodo(id: number) {
    this.dispatch({ type: 'TOGGLE_TODO', payload: id });
    this.todoState.update((state) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  }

  deleteTodo(id: number) {
    this.dispatch({ type: 'DELETE_TODO', payload: id });
    this.todoState.update((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.dispatch({ type: 'SET_FILTER', payload: filter });
    this.todoState.update((state) => ({
      ...state,
      filter,
    }));
  }

  clearCompleted() {
    this.dispatch({ type: 'CLEAR_COMPLETED' });
    this.todoState.update((state) => ({
      ...state,
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  }

  // Helper per loggare le actions
  private dispatch(action: Action) {
    const log = `${action.type}${action.payload ? ` (${JSON.stringify(action.payload)})` : ''}`;
    this.actionsLog.update((logs) => [log, ...logs].slice(0, 10));
  }

  clearLogs() {
    this.actionsLog.set([]);
  }
}
