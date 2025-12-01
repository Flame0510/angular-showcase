# Reusable Components Guidelines

## 📋 Overview
This document defines standards for creating and maintaining reusable components in the Angular Showcase project.

> **🎨 Styling Conventions**: For universal SCSS best practices (mobile-first, rem(), BEM, etc.) that apply to ALL project files, see [Styling Conventions](./styling-conventions.md).

## 🎯 General Principles

### Component Structure
Every reusable component MUST include:
1. **TypeScript file** (`.ts`) - Component logic and interface exports
2. **HTML template** (`.html`) - Component markup
3. **SCSS styles** (`.scss`) - Component styles
4. **Test file** (`.spec.ts`) - Unit tests

### File Organization
```
components/
  component-name/
    component-name.ts       # Component class + exported interfaces
    component-name.html     # Template with HTML comments
    component-name.scss     # Styles with detailed comments
    component-name.spec.ts  # Unit tests
```

## 📝 Documentation Requirements

### TypeScript (.ts) Files

#### 1. Interface Documentation
```typescript
/**
 * Interface for ComponentName data structure
 * 
 * @property field1 - Description of field1
 * @property field2 - Description of field2 (optional)
 */
export interface ComponentNameData {
  field1: string;
  field2?: string;
}
```

#### 2. Component Documentation
```typescript
/**
 * ComponentName - Brief description of component purpose
 * 
 * Long description explaining when and how to use this component.
 * Include information about features, behavior, and use cases.
 * 
 * @example
 * ```html
 * <app-component-name
 *   [input1]="value1"
 *   input2="value2">
 * </app-component-name>
 * ```
 */
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-name.html',
  styleUrl: './component-name.scss',
})
export class ComponentName {
  /** Description of input property */
  @Input({ required: true }) input1!: string;
  
  /** Description of optional input */
  @Input() input2?: string;
}
```

### HTML Template Files

#### Comment Structure
```html
<!--
  ComponentName Template
  
  Brief description of what this template renders.
  Include key features or special behaviors.
-->

<!-- Main container -->
<div class="main-container">
  
  <!-- Section description -->
  <div class="section">
    <!-- Element description (if complex or non-obvious) -->
    <h3>{{ title }}</h3>
  </div>
  
  <!-- Optional conditional section -->
  @if (condition) {
    <!-- Explain what this block shows -->
    <div class="conditional-content">
      <!-- ... -->
    </div>
  }
  
  <!-- Loop section -->
  @for (item of items; track $index) {
    <!-- Explain what each iteration renders -->
    <div class="item">{{ item }}</div>
  }
</div>
```

#### HTML Comment Guidelines
- **File header**: Overview of template purpose
- **Section comments**: Describe major template sections
- **Element comments**: Explain complex or non-obvious elements
- **Conditional/Loop comments**: Clarify when/why content shows
- **Avoid**: Over-commenting obvious elements like `<div>` or `<span>`

### SCSS Style Files

#### Comment Structure
```scss
/**
 * ComponentName Styles
 * 
 * Brief description of styling approach.
 * Mention key features like hover effects, animations, responsive behavior.
 */

@use 'globals' as *;

// ═══ MAIN SECTION NAME ═══
.main-container {
  // Base styling
  property: value;
  
  // Specific purpose comment
  property: value;
  
  // ─── SUBSECTION NAME ───
  .subsection {
    // Comment explaining styling choice
    property: value;
    
    // Hover/interaction effects
    &:hover {
      property: value;
    }
  }
}

// ═══ RESPONSIVE DESIGN ═══

// Breakpoint description (max-width: value)
@include media-max-breakpoint(md) {
  .main-container {
    // Comment explaining responsive adjustments
    property: value;
  }
}
```

#### SCSS Comment Guidelines
- **File header**: `/** ... */` block with component overview
- **Major sections**: `// ═══ SECTION ═══` (double lines)
- **Subsections**: `// ─── Subsection ───` (single lines)
- **Property groups**: Comment groups of related properties
- **Responsive**: Clearly label breakpoints with pixel values
- **Rationale**: Explain non-obvious styling choices

> **Note**: For comprehensive SCSS styling conventions (mobile-first, rem(), BEM, selectors, etc.), see [Styling Conventions](./styling-conventions.md).

## 🔧 Component Interface Exports

### Export Interfaces with Components
When creating reusable components, always export data interfaces:

```typescript
// component-name.ts

/**
 * Interface for ComponentName data structure
 */
export interface ComponentNameData {
  field1: string;
  field2: string;
}

/**
 * ComponentName component
 */
@Component({
  // ...
})
export class ComponentName {
  // ...
}
```

### Usage in Parent Components
```typescript
import { ComponentName, ComponentNameData } from '@components/component-name/component-name';

// Use the exported interface for type-safe data arrays
items: ComponentNameData[] = [
  { field1: 'value1', field2: 'value2' },
  // ...
];
```

## ✅ Checklist for New Reusable Components

Before marking a reusable component as complete, verify:

### TypeScript (.ts)
- [ ] Exported interface(s) with JSDoc comments
- [ ] Component JSDoc with description and `@example`
- [ ] All `@Input()` properties have inline comments
- [ ] Interface types use centralized types (e.g., `CodeLanguage` from `@models/code`)

### HTML (.html)
- [ ] File header comment explaining template purpose
- [ ] Major sections have descriptive comments
- [ ] Complex elements have inline comments
- [ ] Conditional blocks (`@if`) are explained
- [ ] Loops (`@for`) describe iteration purpose

### SCSS (.scss)
- [ ] File header block (`/** ... */`) with overview
- [ ] `@use 'globals' as *;` for SCSS variables
- [ ] Follows [Styling Conventions](./styling-conventions.md) (mobile-first, rem(), BEM)
- [ ] Major sections marked with `// ═══ SECTION ═══`
- [ ] Subsections marked with `// ─── Subsection ───`
- [ ] Responsive breakpoints commented with pixel values
- [ ] Non-obvious styling choices explained

### General
- [ ] Component is fully standalone
- [ ] Component follows project naming conventions
- [ ] Imports use path aliases (`@components`, `@models`, etc.)
- [ ] Component is tested (`.spec.ts` exists)

## 📚 Examples of Well-Documented Components

### ConceptCard Component
Location: `src/app/components/concept-card/`

Features comprehensive documentation:
- Exported `ConceptCardData` interface
- Detailed component JSDoc with example
- HTML template with section comments
- SCSS with section markers and responsive comments

### GuideStep Component
Location: `src/app/components/guide-step/`

Features comprehensive documentation:
- Exported `GuideStepData` interface with nested types
- Component JSDoc explaining all inputs
- HTML comments for complex nested structures
- SCSS with detailed styling rationale

## 🚫 Common Pitfalls to Avoid

1. **Missing interface exports**: Always export data interfaces with components
2. **CSS custom properties**: Use SCSS variables instead of `var(--name)`
3. **Uncommented complexity**: Complex logic or styling needs explanation
4. **Missing responsive styles**: Always consider mobile/tablet views
5. **Over-commenting**: Don't comment obvious code like `<div>` or `margin: 0`
6. **Under-commenting**: Do explain non-obvious choices and complex structures

## 🔄 Updating Existing Components

When modifying reusable components:
1. Update all relevant comments
2. Maintain comment structure consistency
3. Document new features or changed behavior
4. Update `@example` blocks if usage changes
5. Add comments for new complex logic

---

**Remember**: Good documentation is as important as good code. Future developers (including yourself) will thank you!
