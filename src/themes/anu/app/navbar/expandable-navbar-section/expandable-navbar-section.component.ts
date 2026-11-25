import {
  AsyncPipe,
  NgComponentOutlet,
} from '@angular/common';
import { Component, OnInit, ElementRef, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';

import { ExpandableNavbarSectionComponent as BaseComponent } from '../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component';
import { slide } from '../../../../../app/shared/animations/slide';
import { HoverOutsideDirective } from '../../../../../app/shared/utils/hover-outside.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ds-themed-expandable-navbar-section',
  templateUrl: './expandable-navbar-section.component.html',
  // templateUrl: '../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.html',
  styleUrls: ['./expandable-navbar-section.component.scss'],
  // styleUrls: ['../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.scss'],
  animations: [slide],
  imports: [
    AsyncPipe,
    HoverOutsideDirective,
    NgComponentOutlet,
    RouterLinkActive,
  ],
})
export class ExpandableNavbarSectionComponent extends BaseComponent implements OnInit {
  private elementRef = inject(ElementRef);
  private readonly router = inject(Router);

  private readonly closeOnRouteChange =  this.router.events
        .pipe(takeUntilDestroyed())
        .subscribe(event => {
          if(event instanceof NavigationEnd && this.active$.value) {
            this.menuService.deactivateSection(this.menuID, this.section.id);
          }
        });
  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent): void {
    const hostElement = this.elementRef.nativeElement;
    const clickedElement = event.target as Node;
    const clickedInside = hostElement.contains(clickedElement);
    if (!clickedInside && this.active$.value) {
      this.deactivateSection(event, false);
    }
  }
}
