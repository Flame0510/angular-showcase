import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlock } from '@components/code-block/code-block';
import { CodeLanguage } from '@models/code';

/**
 * Interface for ConceptCard data structure
 */
export interface ConceptCardData {
  icon: string;
  title: string;
  description: string;
  code: string;
  codeLanguage?: CodeLanguage;
  keyPointsTitle: string;
  keyPoints: string[];
}

/**
 * Reusable concept card component for displaying conceptual information
 * with icon, title, description, optional code example, and key points list.
 *
 * @example
 * ```html
 * <app-concept-card
 *   icon="🏪"
 *   title="Store"
 *   description="The central container for application state."
 *   [code]="storeCode"
 *   codeLanguage="typescript"
 *   keyPointsTitle="Features:"
 *   [keyPoints]="['Immutable', 'Predictable', 'Centralized']">
 * </app-concept-card>
 * ```
 */
@Component({
  selector: 'app-concept-card',
  standalone: true,
  imports: [CommonModule, CodeBlock],
  templateUrl: './concept-card.html',
  styleUrl: './concept-card.scss',
})
export class ConceptCard {
  /** Emoji or icon character to display */
  @Input({ required: true }) icon!: string;

  /** Main title of the concept */
  @Input({ required: true }) title!: string;

  /** Detailed description text */
  @Input({ required: true }) description!: string;

  /** Optional code snippet to display */
  @Input() code?: string;

  /** Programming language for syntax highlighting (default: 'typescript') */
  @Input() codeLanguage: CodeLanguage = 'typescript';

  /** Title for the key points section (e.g., "Features:", "Best Practices:") */
  @Input() keyPointsTitle?: string;

  /** Array of key points to display as a list */
  @Input() keyPoints?: string[];
}
