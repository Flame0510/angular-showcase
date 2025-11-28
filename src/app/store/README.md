# NgRx Store Structure

## 📁 Struttura dello Store

Lo store segue il pattern Redux con una struttura modulare simile a Redux Toolkit:

```
store/
├── counter/              # Counter slice
│   ├── counter.state.ts      # Interface dello state
│   ├── counter.actions.ts    # Actions
│   ├── counter.reducer.ts    # Reducer
│   └── counter.selectors.ts  # Selectors
├── todo/                 # Todo slice  
│   ├── todo.state.ts
│   ├── todo.actions.ts
│   ├── todo.reducer.ts
│   └── todo.selectors.ts
├── actions-log/          # Actions Log slice
│   ├── actions-log.state.ts
│   ├── actions-log.actions.ts
│   ├── actions-log.reducer.ts
│   └── actions-log.selectors.ts
├── app.state.ts          # Root state interface
├── app.reducers.ts       # Combinazione di tutti i reducers
└── index.ts              # Barrel exports
```

## 🎯 Caratteristiche

### Counter Slice
- **State**: `count`, `history`
- **Actions**: `increment`, `decrement`, `reset`
- **Selectors**: `selectCount`, `selectHistory`, `selectCounterFull`

### Todo Slice
- **State**: `todos[]`, `filter`
- **Actions**: `addTodo`, `toggleTodo`, `deleteTodo`, `setFilter`, `clearCompleted`
- **Selectors**: `selectAllTodos`, `selectFilteredTodos`, `selectActiveTodosCount`, `selectCompletedTodosCount`

### Actions Log Slice
- **State**: `logs[]`
- **Actions**: `clearLogs`
- **Feature**: Intercetta automaticamente tutte le actions di counter e todo per il logging

## 🔧 Setup

Lo store è configurato in `app.config.ts`:

```typescript
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducers } from './store/app.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(appReducers),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
```

## 💡 Utilizzo nei Componenti

```typescript
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as CounterActions from './store/counter/counter.actions';
import * as CounterSelectors from './store/counter/counter.selectors';

export class MyComponent {
  count$ = this.store.select(CounterSelectors.selectCount);

  constructor(private store: Store<AppState>) {}

  increment() {
    this.store.dispatch(CounterActions.increment());
  }
}
```

## 🛠️ DevTools

L'app include Redux DevTools per ispezionare lo stato e le actions in tempo reale.

Installa l'estensione Redux DevTools nel tuo browser per il debugging.
