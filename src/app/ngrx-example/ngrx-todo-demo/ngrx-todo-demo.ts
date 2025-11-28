import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

@Component({
  selector: 'app-ngrx-todo-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ngrx-todo-demo.html',
  styleUrls: ['./ngrx-todo-demo.scss'],
})
export class NgrxTodoDemo {
  todoState = input.required<TodoState>();
  actionsLog = input.required<string[]>();
  newTodoText = input.required<string>();
  filteredTodos = input.required<Todo[]>();
  activeTodosCount = input.required<number>();
  completedTodosCount = input.required<number>();

  onAddTodo = output();
  onToggleTodo = output<number>();
  onDeleteTodo = output<number>();
  onSetFilter = output<'all' | 'active' | 'completed'>();
  onClearCompleted = output();
  onClearLogs = output();
  onNewTodoTextChange = output<string>();
}
