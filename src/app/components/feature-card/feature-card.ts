// COMPONENT TYPE: Presentational
// SECTION: Shared UI Components
//
// ROLE:
// - Display an interactive feature card with 3D parallax hover effect
// - Show feature icon, title, description, and bullet points
// - Provide navigation through routerLink
//
// PATTERNS USED:
// - Pure presentational component (no business logic)
// - @Input() for all data, no @Output() needed (navigation via RouterLink)
// - Signal-based reactive transform for smooth 3D effect
// - HostListener for global mouse tracking
//
// NOTES FOR CONTRIBUTORS:
// - Keep this component stateless and reusable
// - 3D effect parameters (MAX_ROTATION_DEGREES, perspective) can be tuned for different feel
// - Do not add data fetching or navigation logic here
// - All visual behavior should be CSS-based where possible

import { Component, Input, HostListener, signal, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-feature-card',
  imports: [RouterLink, Icon],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
})
export class FeatureCard {
  // Maximum rotation in degrees for 3D parallax effect
  // Lower values = more subtle and natural effect
  private readonly MAX_ROTATION_DEGREES = 2;

  @Input() routerLink!: string;

  // iconName is the icon name to render (e.g. 'users', 'forms', etc.)
  // It is passed to the Icon component which handles rendering via @switch
  @Input() iconName!: string;

  @Input() title!: string;
  @Input() description!: string;
  @Input() features!: string[];

  /**
   * 3D PARALLAX EFFECT
   *
   * This signal contains the CSS transform value applied to the card.
   * Combines three transformations:
   *
   * 1. perspective(1000px): Creates 3D depth, lower = more pronounced effect
   * 2. rotateX/rotateY: Card rotates following mouse position
   * 3. scale: Enlarges card (1.05) on hover, normal (1) otherwise
   *
   * Value is recalculated on every mouse movement across the page
   */
  transform = signal('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');

  /**
   * Tracks whether the mouse is over the card
   * Used to apply scale(1.05) and change colors/background
   */
  private isHovering = signal(false);

  constructor(private elementRef: ElementRef) {}

  /**
   * Activate hover state when mouse enters the card
   * Trigger for scale and color changes (handled via CSS :hover)
   */
  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovering.set(true);
  }

  /**
   * Deactivate hover state when mouse leaves the card
   * Card returns to normal size (scale 1)
   */
  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovering.set(false);
  }

  /**
   * HEART OF THE PARALLAX EFFECT
   *
   * Listens to mouse movement on the ENTIRE page (document:mousemove)
   * On each movement:
   *
   * 1. Gets card position in viewport (getBoundingClientRect)
   * 2. Calculates mouse position RELATIVE to card center
   *    - If mouse is centered: x=0, y=0 → no rotation
   *    - If mouse is at edges: x=±1, y=±1 → maximum rotation
   * 3. Multiplies by MAX_ROTATION_DEGREES to get rotation degrees
   * 4. rotateX is inverted (-y) for a more natural effect:
   *    mouse up → card tilts upward
   * 5. Applies scale(1.05) if isHovering is true, otherwise scale(1)
   * 6. Updates transform signal which is bound to the template
   *
   * Result: each card "looks at" the mouse regardless of its position
   */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const card = this.elementRef.nativeElement;
    const rect = card.getBoundingClientRect();

    // Normalize mouse position relative to card center
    // Result: values from -1 (left/top) to +1 (right/bottom)
    const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // Calculate rotation degrees
    // rotateY: positive = rotate right, negative = rotate left
    // rotateX: negative = rotate up, positive = rotate down (inverted with -y)
    const rotateY = x * this.MAX_ROTATION_DEGREES;
    const rotateX = -y * this.MAX_ROTATION_DEGREES;

    // Slightly scale the card on hover for a "lift" effect
    const scale = this.isHovering() ? 1.05 : 1;

    // Apply all transformations together
    this.transform.set(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
    );
  }
}
