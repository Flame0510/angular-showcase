import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { CounterState } from '../../store/counter/counter.state';
import * as CounterActions from '../../store/counter/counter.actions';
import * as CounterSelectors from '../../store/counter/counter.selectors';
import * as ActionsLogActions from '../../store/actions-log/actions-log.actions';
import * as ActionsLogSelectors from '../../store/actions-log/actions-log.selectors';

/**
 * Counter Demo Component - Esempio di Smart Component con NgRx
 *
 * Questo componente dimostra il pattern classico NgRx:
 * 1. Inietta lo Store nel constructor
 * 2. Seleziona gli slice di stato tramite selectors (Observable)
 * 3. Dispatcha actions per modificare lo stato
 * 4. Il template usa async pipe per sottoscriversi agli Observable
 */
@Component({
  selector: 'app-ngrx-counter-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngrx-counter-demo.html',
  styleUrls: ['./ngrx-counter-demo.scss'],
})
export class NgrxCounterDemo {
  // 📊 SELECTORS: Observable streams dallo Store
  // Questi Observable emettono automaticamente quando lo stato cambia
  counterState$: Observable<CounterState>;
  actionsLog$: Observable<string[]>;

  constructor(private store: Store<AppState>) {
    // Selezioniamo i dati dallo Store usando i selectors
    // I selectors sono funzioni pure e memoized per performance ottimali
    this.counterState$ = this.store.select(CounterSelectors.selectCounterFull);
    this.actionsLog$ = this.store.select(ActionsLogSelectors.selectLogs);
  }

  // 🚀 ACTIONS: Metodi che dispatchano actions allo Store
  // Ogni dispatch triggera il reducer corrispondente che aggiorna lo stato

  /**
   * Incrementa il counter di 1
   * Flow: dispatch → reducer → nuovo state → selector emette → template aggiorna
   */
  increment() {
    this.store.dispatch(CounterActions.increment());
  }

  /**
   * Decrementa il counter di 1
   */
  decrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  /**
   * Resetta il counter a 0 e pulisce lo storico
   */
  reset() {
    this.store.dispatch(CounterActions.reset());
  }

  /**
   * Pulisce il log delle actions (cross-slice action)
   */
  clearLogs() {
    this.store.dispatch(ActionsLogActions.clearLogs());
  }
}
