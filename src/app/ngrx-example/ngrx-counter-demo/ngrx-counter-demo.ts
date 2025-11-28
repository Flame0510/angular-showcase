import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CounterState {
  count: number;
  history: number[];
}

interface Action {
  type: string;
  payload?: any;
}

@Component({
  selector: 'app-ngrx-counter-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngrx-counter-demo.html',
  styleUrls: ['./ngrx-counter-demo.scss'],
})
export class NgrxCounterDemo {
  counterState = input.required<CounterState>();
  actionsLog = input.required<string[]>();

  onIncrement = output();
  onDecrement = output();
  onReset = output();
  onClearLogs = output();
}
