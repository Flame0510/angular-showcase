import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { AppState } from '../../store/app.state';
import { TodoState, Todo } from '../../store/todo/todo.state';
import * as TodoActions from '../../store/todo/todo.actions';
import * as TodoSelectors from '../../store/todo/todo.selectors';
import * as ActionsLogActions from '../../store/actions-log/actions-log.actions';
import * as ActionsLogSelectors from '../../store/actions-log/actions-log.selectors';

/**
 * Todo Demo Component - Esempio Avanzato con combineLatest
 *
 * Questo componente dimostra:
 * 1. Pattern Smart Component con NgRx Store
 * 2. Uso di combineLatest per sincronizzare multiple streams
 * 3. Mix di Signals (newTodoText) e Observable (vm$)
 * 4. Selectors derivati (filteredTodos, counts)
 */
@Component({
  selector: 'app-ngrx-todo-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ngrx-todo-demo.html',
  styleUrls: ['./ngrx-todo-demo.scss'],
})
export class NgrxTodoDemo {
  /**
   * 🎯 VIEW MODEL PATTERN con combineLatest
   *
   * Combiniamo tutti gli observable in un unico stream per evitare:
   * - Race conditions con nested async pipes
   * - Unmounting del componente quando un observable emette array vuoto
   *
   * Il template usa: @if (vm$ | async; as vm) { ... }
   * Così abbiamo un singolo punto di sottoscrizione sincronizzato
   */
  vm$;

  /**
   * 🔄 LOCAL STATE con Signal
   * Usiamo un Signal per lo stato locale dell'input (non serve nello Store)
   * Questo è UI-only state, non business logic state
   */
  newTodoText = signal('');

  constructor(private store: Store<AppState>) {
    /**
     * combineLatest emette un oggetto quando TUTTI gli observable hanno emesso almeno una volta
     * Ogni nuova emissione da qualsiasi selector triggera un nuovo emit combinato
     */
    this.vm$ = combineLatest({
      todoState: this.store.select(TodoSelectors.selectTodoStateFull),
      actionsLog: this.store.select(ActionsLogSelectors.selectLogs),
      // Selectors derivati: calcolano valori da altri selectors
      filteredTodos: this.store.select(TodoSelectors.selectFilteredTodos),
      activeTodosCount: this.store.select(TodoSelectors.selectActiveTodosCount),
      completedTodosCount: this.store.select(TodoSelectors.selectCompletedTodosCount),
    });
  }

  // 🚀 ACTIONS: Metodi che dispatchano actions allo Store

  /**
   * Aggiunge un nuovo todo allo Store
   * Flow: validate → dispatch → reducer aggiunge → selector emette → UI aggiorna
   */
  addTodo() {
    const text = this.newTodoText().trim();
    if (text) {
      // Dispatch dell'action con payload
      this.store.dispatch(TodoActions.addTodo({ text }));
      // Reset dello stato locale
      this.newTodoText.set('');
    }
  }

  /**
   * Toggle dello stato completed di un todo
   * Il reducer trova il todo per id e inverte il flag completed
   */
  toggleTodo(id: number) {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  /**
   * Rimuove un todo dallo Store
   * Il reducer filtra l'array rimuovendo il todo con questo id
   */
  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  /**
   * Cambia il filtro corrente (all | active | completed)
   * Il selector filteredTodos reagirà emettendo l'array filtrato
   */
  setFilter(filter: 'all' | 'active' | 'completed') {
    this.store.dispatch(TodoActions.setFilter({ filter }));
  }

  /**
   * Rimuove tutti i todo completati in un colpo solo
   * Il reducer filtra l'array mantenendo solo i todo con completed = false
   */
  clearCompleted() {
    this.store.dispatch(TodoActions.clearCompleted());
  }

  /**
   * Pulisce il log delle actions (cross-slice action)
   */
  clearLogs() {
    this.store.dispatch(ActionsLogActions.clearLogs());
  }
}
