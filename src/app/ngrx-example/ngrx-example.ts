import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../page-header/page-header';
import { NgrxConcepts } from './ngrx-concepts/ngrx-concepts';
import { NgrxCounterDemo } from './ngrx-counter-demo/ngrx-counter-demo';
import { NgrxTodoDemo } from './ngrx-todo-demo/ngrx-todo-demo';

@Component({
  selector: 'app-ngrx-example',
  standalone: true,
  imports: [CommonModule, PageHeader, NgrxConcepts, NgrxCounterDemo, NgrxTodoDemo],
  templateUrl: './ngrx-example.html',
  styleUrls: ['./ngrx-example.scss'],
})
export class NgrxExample {
  selectedTab = signal<'counter' | 'todos' | 'concepts'>('concepts');
}
