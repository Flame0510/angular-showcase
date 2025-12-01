import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlock } from '@components/code-block/code-block';
import { ConceptCard, ConceptCardData } from '@components/concept-card/concept-card';
import { GuideStep, GuideStepData } from '@components/guide-step/guide-step';

type StorePattern = 'centralized' | 'feature' | null;

@Component({
  selector: 'app-ngrx-concepts',
  standalone: true,
  imports: [CommonModule, CodeBlock, ConceptCard, GuideStep],
  templateUrl: './ngrx-concepts.html',
  styleUrls: ['./ngrx-concepts.scss'],
})
export class NgrxConcepts {
  // ═══ STATE ═══
  selectedPattern = signal<StorePattern>(null);

  // ═══ CODE EXAMPLES ═══
  storeCode = `// store/counter.state.ts
export interface CounterState {
  count: number;
  history: number[];
}

export const initialState: CounterState = {
  count: 0,
  history: [0]
};`;

  actionsCode = `// store/counter.actions.ts
import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
export const setValue = createAction(
  '[Counter] Set Value',
  props<{ value: number }>()
);`;

  reducerCode = `// store/counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, state => ({
    ...state,
    count: state.count + 1,
    history: [...state.history, state.count + 1]
  })),
  on(CounterActions.decrement, state => ({
    ...state,
    count: state.count - 1,
    history: [...state.history, state.count - 1]
  })),
  on(CounterActions.reset, state => ({
    count: 0,
    history: [0]
  }))
);`;

  selectorsCode = `// store/counter.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const selectCounterState =
  createFeatureSelector<CounterState>('counter');

export const selectCount = createSelector(
  selectCounterState,
  state => state.count
);

export const selectHistory = createSelector(
  selectCounterState,
  state => state.history
);

export const selectLastChange = createSelector(
  selectHistory,
  history => history.length > 1
    ? history[history.length - 1] - history[history.length - 2]
    : 0
);`;

  effectsCode = `// store/counter.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import * as CounterActions from './counter.actions';

@Injectable()
export class CounterEffects {

  // Salva il valore nel localStorage
  saveCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CounterActions.increment,
        CounterActions.decrement,
        CounterActions.reset
      ),
      tap(() => {
        // Side effect: salvare nello storage
        console.log('Salvando counter...');
      })
    ),
    { dispatch: false }
  );

  // Carica il valore all'avvio
  loadCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Init'),
      map(() => {
        const saved = localStorage.getItem('counter');
        return CounterActions.setValue({
          value: saved ? JSON.parse(saved) : 0
        });
      })
    )
  );

  constructor(private actions$: Actions) {}
}`;

  componentCode = `// component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CounterActions from './store/counter.actions';
import { selectCount } from './store/counter.selectors';

@Component({
  selector: 'app-counter',
  template: \`
    <div>
      <h2>Count: {{ count$ | async }}</h2>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Reset</button>
    </div>
  \`
})
export class CounterComponent {
  count$: Observable<number>;

  constructor(private store: Store) {
    this.count$ = this.store.select(selectCount);
  }

  increment() {
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  reset() {
    this.store.dispatch(CounterActions.reset());
  }
}`;

  installCode = `# Installazione base
npm install @ngrx/store @ngrx/store-devtools --legacy-peer-deps

# Oppure con ng add (raccomandato)
ng add @ngrx/store --legacy-peer-deps
ng add @ngrx/store-devtools --legacy-peer-deps

# Per Angular 21+, crea .npmrc nella root:
echo "legacy-peer-deps=true" > .npmrc

# Poi installa normalmente:
npm install @ngrx/store @ngrx/store-devtools`;

  setupCode = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { counterReducer } from './store/counter.reducer';
import { CounterEffects } from './store/counter.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ counter: counterReducer }),
    provideEffects([CounterEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
};`;

  // ═══ CENTRALIZED STORE EXAMPLES ═══
  centralizedStateCode = `// store/app.state.ts
import { CounterState } from './counter/counter.state';
import { TodoState } from './todo/todo.state';
import { ActionsLogState } from './actions-log/actions-log.state';

// Global state interface combining all features
export interface AppState {
  counter: CounterState;
  todo: TodoState;
  actionsLog: ActionsLogState;
}`;

  combinedReducersCode = `// store/app.reducers.ts
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { counterReducer } from './counter/counter.reducer';
import { todoReducer } from './todo/todo.reducer';
import { actionsLogReducer } from './actions-log/actions-log.reducer';

// Combine all feature reducers into one
export const appReducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
  todo: todoReducer,
  actionsLog: actionsLogReducer,
};`;

  provideStoreCode = `// app.config.ts (Centralized Store)
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducers } from './store/app.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    // Provide the combined reducers
    provideStore(appReducers),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ]
};`;

  centralizedSelectorsCode = `// store/counter/counter.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

// Select the feature state from the global state
export const selectCounterState = (state: AppState) => state.counter;

// Create memoized selectors
export const selectCount = createSelector(
  selectCounterState,
  state => state.count
);

export const selectHistory = createSelector(
  selectCounterState,
  state => state.history
);

// ─────────────────────────────────────────────
// Usage in component:
// this.count$ = this.store.select(selectCount);
// ─────────────────────────────────────────────`;

  // ═══ FEATURE STORE EXAMPLES ═══
  featureStateCode = `// store/counter.state.ts (Feature Store)
export interface CounterState {
  count: number;
  history: number[];
}

export const initialState: CounterState = {
  count: 0,
  history: [0]
};

// Each feature manages its own state independently`;

  featureReducerCode = `// store/counter.reducer.ts (Feature Store)
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';
import { initialState } from './counter.state';

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, state => ({
    ...state,
    count: state.count + 1,
    history: [...state.history, state.count + 1]
  })),
  on(CounterActions.decrement, state => ({
    ...state,
    count: state.count - 1,
    history: [...state.history, state.count - 1]
  })),
  on(CounterActions.reset, () => initialState)
);`;

  featureProvideCode = `// app.config.ts (Feature Store)
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    // Empty root store - features register themselves
    provideStore({}),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    })
  ]
};`;

  featureModuleCode = `// counter/counter.routes.ts (Feature Store)
import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { counterReducer } from './store/counter.reducer';

export const counterRoutes: Route[] = [
  {
    path: '',
    providers: [
      // Register feature state when route loads
      provideState('counter', counterReducer)
    ],
    loadComponent: () =>
      import('./counter.component').then(m => m.CounterComponent)
  }
];`;

  featureSelectorCode = `// store/counter.selectors.ts (Feature Store)
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

// Select this feature's state slice
export const selectCounterState =
  createFeatureSelector<CounterState>('counter');

export const selectCount = createSelector(
  selectCounterState,
  state => state.count
);

export const selectHistory = createSelector(
  selectCounterState,
  state => state.history
);`;

  // ═══ CONCEPT CARDS DATA ═══
  conceptCards: ConceptCardData[] = [
    {
      icon: '🏪',
      title: 'Store (Centralizzato)',
      description: 'Il contenitore centrale che mantiene l\'intero stato dell\'applicazione. È l\'unica fonte di verità (single source of truth). In questo progetto, usiamo uno store centralizzato con reducer combinati (pattern Redux).',
      code: this.storeCode,
      keyPointsTitle: 'Caratteristiche:',
      keyPoints: ['✓ Immutabile', '✓ Prevedibile', '✓ Centralizzato', '✓ Serializzabile']
    },
    {
      icon: '⚡',
      title: 'Actions',
      description: 'Eventi che descrivono qualcosa che è successo nell\'applicazione. Sono l\'unico modo per inviare dati allo store.',
      code: this.actionsCode,
      keyPointsTitle: 'Best Practices:',
      keyPoints: ['✓ Usa nomi descrittivi', '✓ Includi la sorgente [Source]', '✓ Passa dati via props', '✓ Mantienile semplici']
    },
    {
      icon: '⚙️',
      title: 'Reducers',
      description: 'Funzioni pure che prendono lo stato corrente e un\'action, e ritornano un nuovo stato. Sono responsabili della gestione delle transizioni di stato.',
      code: this.reducerCode,
      keyPointsTitle: 'Regole:',
      keyPoints: ['✓ Funzioni pure', '✓ No side effects', '✓ No mutazioni dirette', '✓ Ritornano nuovo stato']
    },
    {
      icon: '🔍',
      title: 'Selectors',
      description: 'Funzioni pure per selezionare e derivare dati dallo store. Sono memoizzati per performance ottimali.',
      code: this.selectorsCode,
      keyPointsTitle: 'Vantaggi:',
      keyPoints: ['✓ Memoizzazione', '✓ Riutilizzabili', '✓ Composizione', '✓ Testabili']
    },
    {
      icon: '🌊',
      title: 'Effects',
      description: 'Gestiscono side effects come chiamate HTTP, routing, storage, ecc. Ascoltano le actions e possono emettere nuove actions.',
      code: this.effectsCode,
      keyPointsTitle: 'Casi d\'uso:',
      keyPoints: ['✓ Chiamate API', '✓ WebSocket', '✓ LocalStorage', '✓ Routing']
    },
    {
      icon: '🧩',
      title: 'Integrazione Componenti',
      description: 'Come integrare NgRx nei componenti Angular usando l\'injection dello Store e i selectors.',
      code: this.componentCode,
      keyPointsTitle: 'Pattern:',
      keyPoints: ['✓ Inject Store', '✓ Usa selectors', '✓ Dispatch actions', '✓ Async pipe']
    }
  ];

  // ═══ CENTRALIZED STORE GUIDE STEPS ═══
  centralizedSteps: GuideStepData[] = [
    {
      stepNumber: 1,
      title: '📋 Definisci le Interfacce di Stato',
      explanation: 'Il primo passo è creare le interfacce TypeScript che descrivono la forma dei dati. Ogni <strong>feature</strong> (funzionalità) della tua app avrà la sua interfaccia di stato.',
      codeExample: {
        title: 'Esempio: Counter State',
        description: 'Creiamo uno stato per un semplice contatore con storico:',
        code: this.storeCode
      },
      explanationBox: {
        title: '💡 Cosa stiamo facendo?',
        points: [
          '<code>CounterState</code>: definisce la struttura dei dati del counter',
          '<code>count</code>: il valore corrente del contatore',
          '<code>history</code>: array che tiene traccia di tutti i valori passati',
          '<code>initialState</code>: stato iniziale quando l\'app parte'
        ]
      }
    },
    {
      stepNumber: 2,
      title: '🌍 Crea l\'Interfaccia dello Stato Globale',
      explanation: 'Ora combiniamo tutti gli stati delle feature in un\'unica interfaccia globale. Questo è il "contenitore principale" che contiene tutto lo stato dell\'applicazione.',
      codeExample: {
        title: 'File: store/app.state.ts',
        code: this.centralizedStateCode
      },
      explanationBox: {
        title: '💡 Perché facciamo questo?',
        points: [
          'Ogni feature ha la sua "fetta" nello stato globale',
          '<code>counter</code>, <code>todo</code>, <code>actionsLog</code> sono chiavi dell\'oggetto globale',
          'TypeScript ci dà autocompletamento e type-safety',
          'Lo state tree finale sarà: <code>&#123; counter: &#123;...&#125;, todo: &#123;...&#125;, actionsLog: &#123;...&#125; &#125;</code>'
        ]
      }
    },
    {
      stepNumber: 3,
      title: '⚡ Definisci le Actions',
      explanation: 'Le <strong>Actions</strong> sono eventi che descrivono "cosa è successo" nell\'app. Sono l\'unico modo per inviare informazioni allo store. Pensa a loro come "comandi" o "notifiche".',
      codeExample: {
        title: 'File: store/counter/counter.actions.ts',
        code: this.actionsCode
      },
      explanationBox: {
        title: '💡 Anatomia di un\'Action:',
        points: [
          '<code>[Counter]</code>: prefisso che identifica la sorgente (buona pratica)',
          '<code>Increment</code>: nome descrittivo dell\'azione',
          '<code>props</code>: dati opzionali da passare (es. <code>setValue</code> riceve un valore)',
          'Le actions sono <strong>immutabili</strong> e <strong>serializzabili</strong>'
        ]
      }
    },
    {
      stepNumber: 4,
      title: '⚙️ Crea i Reducers',
      explanation: 'I <strong>Reducers</strong> sono funzioni pure che prendono lo stato corrente e un\'action, e ritornano un nuovo stato. NON modificano mai lo stato esistente, ma ne creano una copia aggiornata.',
      codeExample: {
        title: 'File: store/counter/counter.reducer.ts',
        code: this.reducerCode
      },
      explanationBox: {
        title: '💡 Regole d\'oro dei Reducers:',
        points: [
          '<strong>Funzioni pure</strong>: stesso input = stesso output, sempre',
          '<strong>Immutabilità</strong>: usa spread operator <code>{{ \'{\'  }}...state{{ \'}\'  }}</code> per copiare',
          '<strong>No side effects</strong>: no API calls, no console.log, no modifiche esterne',
          '<code>on()</code>: associa un\'action a una funzione che aggiorna lo stato'
        ]
      }
    },
    {
      stepNumber: 5,
      title: '🔗 Combina i Reducers',
      explanation: 'Ora uniamo tutti i reducers delle feature in un unico oggetto usando <code>ActionReducerMap</code>. Questo crea la mappa completa di come ogni fetta di stato viene aggiornata.',
      codeExample: {
        title: 'File: store/app.reducers.ts',
        code: this.combinedReducersCode
      },
      explanationBox: {
        title: '💡 Come funziona?',
        points: [
          'Ogni chiave (<code>counter</code>, <code>todo</code>, ecc.) corrisponde a una feature',
          'Ogni valore è il reducer che gestisce quella feature',
          'NgRx chiamerà il reducer giusto quando arriva un\'action',
          'Questo è il "ponte" tra lo stato globale e i reducers individuali'
        ]
      }
    },
    {
      stepNumber: 6,
      title: '🚀 Configura lo Store nell\'App',
      explanation: 'Ora dobbiamo "registrare" lo store nell\'applicazione Angular usando <code>provideStore()</code>. Questo rende lo store disponibile in tutta l\'app tramite dependency injection.',
      codeExample: {
        title: 'File: app.config.ts',
        code: this.provideStoreCode
      },
      explanationBox: {
        title: '💡 Cosa fa questo codice?',
        points: [
          '<code>provideStore(appReducers)</code>: inizializza lo store con i reducers combinati',
          '<code>provideStoreDevtools()</code>: attiva le DevTools per debug (solo in dev mode)',
          '<code>maxAge: 25</code>: tiene in memoria le ultime 25 actions per il debug',
          'Da questo momento lo store è pronto e accessibile ovunque!'
        ]
      }
    },
    {
      stepNumber: 7,
      title: '🔍 Crea i Selectors',
      explanation: 'I <strong>Selectors</strong> sono funzioni che "estraggono" dati specifici dallo store. Sono <strong>memoizzati</strong>, cioè cachano i risultati per evitare calcoli inutili.',
      codeExample: {
        title: 'File: store/counter/counter.selectors.ts',
        code: this.centralizedSelectorsCode
      },
      explanationBox: {
        title: '💡 Perché usare i Selectors?',
        points: [
          '<strong>Memoizzazione</strong>: calcola solo se lo stato cambia, altrimenti usa cache',
          '<strong>Riutilizzabilità</strong>: definisci una volta, usa ovunque',
          '<strong>Composizione</strong>: puoi creare selectors complessi da altri selectors',
          '<strong>Type-safety</strong>: TypeScript sa esattamente cosa ritornano'
        ]
      }
    },
    {
      stepNumber: 8,
      title: '🧩 Usa lo Store nei Componenti',
      explanation: 'Finalmente! Ora possiamo usare lo store nei componenti per leggere lo stato e inviare actions.',
      codeExample: {
        title: 'File: counter.component.ts',
        code: this.componentCode
      },
      explanationBox: {
        title: '💡 Il ciclo completo:',
        points: [
          'Component <strong>inietta</strong> lo Store nel constructor',
          'Usa <code>store.select()</code> per <strong>leggere</strong> lo stato (con selector)',
          'Usa <code>store.dispatch()</code> per <strong>inviare</strong> actions',
          'Il reducer <strong>aggiorna</strong> lo stato',
          'Il selector <strong>notifica</strong> il component del cambiamento',
          'La UI si <strong>aggiorna</strong> automaticamente (grazie all\'async pipe!)'
        ]
      }
    }
  ];

  // ═══ FEATURE STORE GUIDE STEPS ═══
  featureSteps: GuideStepData[] = [
    {
      stepNumber: 1,
      title: '📋 Definisci lo Stato della Feature',
      explanation: 'Diversamente dallo store centralizzato, ogni feature definisce solo il <strong>proprio</strong> stato, senza conoscere lo stato di altre features. Questo garantisce isolamento completo.',
      codeExample: {
        title: 'File: features/counter/store/counter.state.ts',
        code: this.featureStateCode
      },
      explanationBox: {
        title: '💡 Differenze chiave:',
        points: [
          'Nessuna interfaccia <code>AppState</code> globale',
          'Ogni feature è <strong>auto-contenuta</strong>',
          'Lo stato esiste solo quando il modulo è caricato (lazy-loading)',
          'Perfetto per features che non condividono mai dati'
        ]
      }
    },
    {
      stepNumber: 2,
      title: '⚙️ Crea Actions e Reducers (identico allo store centralizzato)',
      explanation: 'Le actions e i reducers funzionano esattamente come nello store centralizzato. La differenza sta in <strong>come</strong> vengono registrati nell\'app.',
      codeExample: {
        title: 'File: features/counter/store/counter.reducer.ts',
        code: this.featureReducerCode
      },
      explanationBox: {
        title: '💡 Nota importante:',
        content: 'Il codice del reducer è identico al centralizzato. La "magia" avviene nella registrazione, che vedremo nel prossimo step!'
      }
    },
    {
      stepNumber: 3,
      title: '🌍 Setup dello Store Root (Vuoto)',
      explanation: 'Con i Feature Stores, lo store root parte <strong>vuoto</strong>. Ogni feature si registrerà dinamicamente quando viene caricata. Questo permette di caricare solo lo stato necessario.',
      codeExample: {
        title: 'File: app.config.ts',
        code: this.featureProvideCode
      },
      explanationBox: {
        title: '💡 Perché uno store vuoto?',
        points: [
          '<code>provideStore(&#123;&#125;)</code>: inizializza lo store senza stato iniziale',
          'Le features aggiungeranno il loro stato quando necessario',
          '<strong>Bundle size più piccolo</strong> all\'avvio',
          'Perfetto per <strong>lazy-loading</strong>: carica solo ciò che serve'
        ]
      }
    },
    {
      stepNumber: 4,
      title: '🔌 Registra la Feature Store (Lazy-Loading)',
      explanation: 'Questo è il cuore del pattern Feature Store! Quando una route viene caricata, registra dinamicamente il suo stato nello store usando <code>provideState()</code>.',
      codeExample: {
        title: 'File: features/counter/counter.routes.ts',
        code: this.featureModuleCode
      },
      explanationBox: {
        title: '💡 Come funziona?',
        points: [
          'Quando l\'utente naviga alla route, Angular carica il modulo',
          '<code>provideState(\'counter\', counterReducer)</code>: registra lo stato nello store',
          'Lo stato \'counter\' appare dinamicamente nello store globale',
          'Quando l\'utente lascia la route, lo stato può essere mantenuto o rimosso'
        ]
      }
    },
    {
      stepNumber: 5,
      title: '🔍 Crea i Selectors con createFeatureSelector',
      explanation: 'Per i Feature Stores, usiamo <code>createFeatureSelector</code> invece di selezionare manualmente dallo stato globale. NgRx sa trovare automaticamente la feature corretta.',
      codeExample: {
        title: 'File: features/counter/store/counter.selectors.ts',
        code: this.featureSelectorCode
      },
      explanationBox: {
        title: '💡 Differenze con i selectors centralizzati:',
        points: [
          '<code>createFeatureSelector(\'counter\')</code>: seleziona automaticamente la feature',
          'Non serve definire manualmente <code>(state: AppState) => state.counter</code>',
          'Più conciso e auto-documentante',
          'Il resto funziona identicamente (memoizzazione, composizione)'
        ]
      }
    },
    {
      stepNumber: 6,
      title: '🧩 Usa lo Store nei Componenti (identico!)',
      explanation: 'La parte bella? <strong>I componenti non sanno la differenza!</strong> Il codice è identico sia per store centralizzato che feature store.',
      codeExample: {
        title: 'File: features/counter/counter.component.ts',
        code: this.componentCode
      },
      explanationBox: {
        title: '💡 Vantaggi di questa astrazione:',
        points: [
          'Stesso codice nei components per entrambi i pattern',
          'Puoi <strong>migrare</strong> da feature stores a centralizzato (o viceversa) facilmente',
          'I componenti sono disaccoppiati dall\'architettura dello store',
          'Testabilità identica per entrambi gli approcci'
        ]
      }
    }
  ];

  // ═══ METHODS ═══
  selectPattern(pattern: StorePattern) {
    this.selectedPattern.set(pattern);
    // Scroll to guide section
    setTimeout(() => {
      const element = document.getElementById('pattern-guide');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}
