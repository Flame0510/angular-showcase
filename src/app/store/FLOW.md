# NgRx Flow Example

## 🔄 Flusso Completo di un'Action

### Esempio: Incrementare il Counter

```
1. USER INTERACTION
   └─> Button Click (component)

2. DISPATCH ACTION
   └─> store.dispatch(CounterActions.increment())

3. ACTIONS LOG REDUCER (intercetta)
   └─> Aggiunge "INCREMENT" ai logs

4. COUNTER REDUCER
   └─> Aggiorna state: { count: count + 1, history: [...history, count + 1] }

5. SELECTORS (memoized)
   ├─> selectCount → restituisce il nuovo count
   ├─> selectHistory → restituisce la nuova history
   └─> selectCounterFull → restituisce tutto lo state

6. COMPONENT (via async pipe)
   └─> UI si aggiorna automaticamente
```

## 📊 App State Structure

```typescript
AppState {
  counter: {
    count: number,
    history: number[]
  },
  todo: {
    todos: Todo[],
    filter: 'all' | 'active' | 'completed'
  },
  actionsLog: {
    logs: string[]
  }
}
```

## 🎨 Pattern Utilizzati

### 1. **Feature Slices** (Redux Pattern)
Ogni feature ha il proprio slice con:
- State interface
- Actions
- Reducer
- Selectors

### 2. **Immutability**
Tutti i reducer usano spread operator per creare nuovi oggetti:
```typescript
on(increment, (state) => ({
  ...state,
  count: state.count + 1
}))
```

### 3. **Memoized Selectors**
I selectors sono memoizzati per performance:
```typescript
export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectFilter,
  (todos, filter) => { /* logic */ }
);
```

### 4. **Cross-Slice Communication**
Il reducer `actionsLog` ascolta le actions di altri slice:
```typescript
on(CounterActions.increment, (state) => ({
  logs: ['INCREMENT', ...state.logs]
}))
```

## 🚀 Vantaggi di questa Architettura

✅ **Separazione delle Responsabilità**: Ogni slice è indipendente
✅ **Scalabilità**: Facile aggiungere nuovi slice
✅ **Testabilità**: Reducer e selector sono funzioni pure
✅ **Type Safety**: TypeScript end-to-end
✅ **DevTools**: Debugging facilitato con Redux DevTools
✅ **Performance**: Selectors memoizzati e OnPush change detection
