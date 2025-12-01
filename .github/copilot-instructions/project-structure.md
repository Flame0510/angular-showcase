# Project Structure Guidelines

## 📁 Directory Organization

### Root Structure
```
angular-showcase/
├── .github/
│   └── copilot-instructions/       # Copilot instruction files
│       ├── copilot-instructions.md # Main instructions (symlink to root)
│       ├── project-structure.md    # This file
│       ├── reusable-components.md  # Component documentation standards
│       ├── styling.md              # SCSS and styling guidelines
│       └── typescript.md           # TypeScript conventions
├── src/
│   ├── app/                        # Application code
│   ├── services/                   # Shared services
│   ├── styles/                     # Global styles
│   └── types/                      # TypeScript types and interfaces
├── public/                         # Static assets
└── .github/copilot-instructions.md # Symlink to instructions folder
```

### App Structure
```
src/app/
├── components/                     # Reusable components
│   ├── code-block/
│   ├── concept-card/
│   ├── feature-card/
│   ├── guide-step/
│   └── icon/
├── [feature]/                      # Feature components (routes)
│   ├── data-binding/
│   ├── directives/
│   ├── forms/
│   ├── signals/
│   ├── http-example/
│   ├── ngrx-example/
│   └── user-list/
├── directives/                     # Custom directives
├── store/                          # NgRx store (centralized)
│   ├── actions-log/
│   ├── counter/
│   ├── todo/
│   ├── app.state.ts
│   ├── app.reducers.ts
│   └── index.ts
├── app.ts                          # Root component
├── app.html
├── app.scss
├── app.config.ts                   # App configuration
└── app.routes.ts                   # Route definitions
```

## 🗂️ File Naming Conventions

### Components
- **Files**: `component-name.ts`, `component-name.html`, `component-name.scss`, `component-name.spec.ts`
- **Class**: `ComponentName` (PascalCase)
- **Selector**: `app-component-name` (kebab-case with `app-` prefix)

### Services
- **Files**: `service-name.service.ts`
- **Class**: `ServiceNameService` (PascalCase with `Service` suffix)

### Interfaces/Types
- **Files**: `model-name.ts` (in `src/types/`)
- **Interface**: `ModelName` (PascalCase, no `I` prefix)
- **Type**: `TypeName` (PascalCase)

### Directives
- **Files**: `directive-name.ts`
- **Class**: `DirectiveName` (PascalCase)
- **Selector**: `appDirectiveName` (camelCase with `app` prefix)

## 📦 Import Path Aliases

Configured in `tsconfig.json`:

```typescript
// ✅ USE path aliases
import { Component } from '@app/component-name/component-name';
import { FeatureCard } from '@components/feature-card/feature-card';
import { UsersService } from '@services/users.service';
import { CodeLanguage } from '@models/code';

// ❌ DON'T use relative paths for shared code
import { FeatureCard } from '../../components/feature-card/feature-card';
```

### Available Aliases
- `@app/*` → `src/app/*`
- `@components/*` → `src/app/components/*`
- `@services/*` → `src/services/*`
- `@directives/*` → `src/app/directives/*`
- `@models/*` → `src/types/*`
- `@styles/*` → `src/styles/*`

## 🎯 Component Categories

### Reusable Components (`components/`)
Self-contained, reusable UI components:
- Must be fully documented
- Must export data interfaces
- Used across multiple features
- Examples: `CodeBlock`, `ConceptCard`, `GuideStep`, `Icon`

### Feature Components (root level in `app/`)
Route-specific components:
- One per route
- Can use reusable components
- Located directly under `app/`
- Examples: `DataBinding`, `Signals`, `NgrxExample`

### Layout Components
Special-purpose layout components:
- `Navbar` - Navigation bar
- `PageHeader` - Page title and subtitle
- `BouncingLogo` - Animated logo

## 📂 When to Create New Directories

### Create New Component Directory When:
- Component is reusable across multiple features
- Component has multiple files (ts, html, scss, spec)
- Component has significant complexity

### Keep in Single File When:
- Simple directive with no template
- Pure service with no dependencies
- Single interface or type definition

## 🔄 Migration Guidelines

### Moving Components to `components/`
If a component is used in multiple features:
1. Move to `src/app/components/component-name/`
2. Export data interfaces from component file
3. Update all imports to use path alias
4. Add comprehensive documentation
5. Ensure responsive styles are included

### Extracting Shared Logic
If multiple components share logic:
1. Create service in `src/services/`
2. Move shared logic to service
3. Inject service in components
4. Document service purpose and methods

### Centralizing Types
If types are used across features:
1. Create file in `src/types/`
2. Export types from that file
3. Update imports to use `@models/*` alias
4. Document type purpose and fields

## 📋 File Organization Best Practices

### Keep Related Files Together
```
feature/
  feature.ts
  feature.html
  feature.scss
  feature.spec.ts
  sub-component/          # Sub-component specific to this feature
    sub-component.ts
    sub-component.html
    sub-component.scss
```

### Separate Concerns
- **Business logic** → Services
- **State management** → Store
- **UI components** → Components
- **Type definitions** → Types
- **Utilities** → Services or separate utils folder

### Avoid Deep Nesting
- Maximum 2-3 levels deep for feature components
- Keep flat structure for reusable components
- Use path aliases to avoid `../../..` imports

## 🚀 Adding New Features

### Checklist for New Feature
1. Create feature directory under `app/`
2. Create component files (ts, html, scss, spec)
3. Add route in `app.routes.ts`
4. Create any feature-specific sub-components
5. Extract reusable parts to `components/` if needed
6. Add types to `types/` if shared across features
7. Document component purpose and usage

### Checklist for New Reusable Component
1. Create directory under `app/components/`
2. Create all four files (ts, html, scss, spec)
3. Export data interface from component file
4. Add comprehensive documentation (see `reusable-components.md`)
5. Test in at least two different features
6. Add to this documentation as example

## 📝 Documentation Location

- **Component-specific docs**: JSDoc in component files
- **Architecture docs**: `.github/copilot-instructions/`
- **Feature docs**: README in feature directory (if complex)
- **Store docs**: `store/README.md` and `store/FLOW.md`

---

**Remember**: Good project structure makes code easier to find, understand, and maintain!
