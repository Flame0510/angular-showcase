import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlock } from '@components/code-block/code-block';
import { CodeLanguage } from '@models/code';

/**
 * Interface for GuideStep data structure
 */
export interface GuideStepData {
  stepNumber: number;
  title: string;
  explanation: string;
  codeExample?: {
    title: string;
    code: string;
    language?: CodeLanguage;
    description?: string;
  };
  explanationBox?: {
    title: string;
    content?: string;
    points?: string[];
  };
}

/**
 * GuideStep component for displaying step-by-step instructions
 * with numbered badge, title, explanation, code example, and explanation box.
 *
 * @example
 * ```html
 * <app-guide-step
 *   [stepNumber]="1"
 *   title="Define State Interface"
 *   explanation="Create TypeScript interfaces that describe the shape of your data."
 *   [codeExample]="{ title: 'File: store/counter.state.ts', code: stateCode }"
 *   [explanationBox]="{ title: 'What are we doing?', points: ['Define state structure', 'Set initial values'] }">
 * </app-guide-step>
 * ```
 */
@Component({
  selector: 'app-guide-step',
  standalone: true,
  imports: [CommonModule, CodeBlock],
  templateUrl: './guide-step.html',
  styleUrl: './guide-step.scss',
})
export class GuideStep {
  /** Step number to display in the circular badge */
  @Input({ required: true }) stepNumber!: number;

  /** Step title with emoji (e.g., "📋 Define State Interface") */
  @Input({ required: true }) title!: string;

  /** Explanation text describing what this step does */
  @Input({ required: true }) explanation!: string;

  /** Optional code example block */
  @Input() codeExample?: {
    title: string;
    code: string;
    language?: CodeLanguage;
    description?: string;
  };

  /** Optional explanation box with tips and details */
  @Input() explanationBox?: {
    title: string;
    content?: string;
    points?: string[];
  };
}
