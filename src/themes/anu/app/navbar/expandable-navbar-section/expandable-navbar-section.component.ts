import { Component, Inject, Injector, OnInit } from '@angular/core';
import { NavbarSectionComponent } from 'src/app/navbar/navbar-section/navbar-section.component';
import { MenuService } from 'src/app/shared/menu/menu.service';
import { slide } from 'src/app/shared/animations/slide';
import { first } from 'rxjs/operators';
import { HostWindowService } from 'src/app/shared/host-window.service';
import { rendersSectionForMenu } from 'src/app/shared/menu/menu-section.decorator';
import { MenuID } from 'src/app/shared/menu/menu-id.model';
import { ExpandableNavbarSectionComponent as BaseComponent } from '../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component';
  /**}

/**
 * Represents an expandable section in the navbar
 */
@Component({
  selector: 'ds-expandable-navbar-section',
  templateUrl: './expandable-navbar-section.component.html',
  // templateUrl:'../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.html',
  styleUrls: ['./expandable-navbar-section.component.scss'],
  // styleUrls: ['../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.scss'],
  animations: [slide]
})

export class ExpandableNavbarSectionComponent extends BaseComponent implements OnInit {

}
