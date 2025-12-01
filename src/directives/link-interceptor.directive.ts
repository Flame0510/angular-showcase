// COMPONENT TYPE: Directive
// SECTION: UI Behavior - Link Interception
//
// ROLE:
// - Intercept all link clicks in the application
// - Open external links in modal instead of new tab
// - Handle target="_blank" links with modal
// - Distinguish between internal and external links
//
// PATTERNS USED:
// - HostListener for click event interception
// - Event delegation (closest('a') to find anchor)
// - Modal service integration for external links
// - Router for internal navigation
//
// NOTES FOR CONTRIBUTORS:
// - Applied globally via app.ts
// - Prevents external links from leaving the app
// - Uses ModalService to determine if link is external
// - Preserves normal router navigation for internal links
// - Always preventDefault/stopPropagation for intercepted links

import { Directive, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../app/services/modal.service';

@Directive({
  selector: '[appLinkInterceptor]',
  standalone: true,
})
export class LinkInterceptor {
  private modalService = inject(ModalService);
  private router = inject(Router);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');

    if (!anchor) {
      return;
    }

    const href = anchor.getAttribute('href');
    const target_attr = anchor.getAttribute('target');

    // If link has target="_blank" or no href, ignore
    if (!href || href === '#') {
      return;
    }

    // If has target="_blank", intercept and open in modal
    if (target_attr === '_blank') {
      event.preventDefault();
      event.stopPropagation();

      if (this.modalService.isExternal(href)) {
        this.modalService.openExternal(href, anchor.textContent || undefined);
      } else {
        // Internal link - navigate using router in modal
        this.router.navigate([href]);
      }
      return;
    }

    // Check if link is external
    if (this.modalService.isExternal(href)) {
      event.preventDefault();
      event.stopPropagation();
      this.modalService.openExternal(href, anchor.textContent || undefined);
    }
  }
}
