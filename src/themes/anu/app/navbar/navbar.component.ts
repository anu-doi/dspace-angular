import { Component, OnInit } from '@angular/core';
import { any } from 'prop-types';
import { find, map } from 'rxjs';
import { hasValue } from 'src/app/shared/empty.util';
import { MenuID } from 'src/app/shared/menu/menu-id.model';
import { MenuItemType } from 'src/app/shared/menu/menu-item-type.model';
import { LinkMenuItemModel } from 'src/app/shared/menu/menu-item/models/link.model';
import { TextMenuItemModel } from 'src/app/shared/menu/menu-item/models/text.model';
import { ExternalLinkMenuItemModel } from 'src/app/shared/menu/menu-item/models/external-link.model';
import { MenuSection } from 'src/app/shared/menu/menu-section.model';
import { MenuState } from 'src/app/shared/menu/menu-state.model';
import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';

/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-navbar',
  // styleUrls: ['./navbar.component.scss'],
  styleUrls: ['../../../../app/navbar/navbar.component.scss'],
  // templateUrl: './navbar.component.html',
  templateUrl: '../../../../app/navbar/navbar.component.html',
  animations: [slideMobileNav]
})


export class NavbarComponent extends BaseComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
    this.addToPublicMenu();
  }

  addToPublicMenu() {
    const menuList: any[] = [{
      id: 'related_links_archive',
      parentID: 'browse_related_links',
      active: false,
      visible: true,
      index: 2,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'ANU Archives',
        href: 'https://archives.anu.edu.au/'
      } as ExternalLinkMenuItemModel,
    }, {
      id: 'related_links_press',
      parentID: 'browse_related_links',
      active: false,
      visible: true,
      index: 2,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'ANU Press',
        href: 'https://press.anu.edu.au/'
      } as ExternalLinkMenuItemModel,
    }, {
      id: 'related_links_library',
      parentID: 'browse_related_links',
      active: false,
      visible: true,
      index: 2,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'ANU Library',
        href: 'http://anulib.anu.edu.au/'
      } as ExternalLinkMenuItemModel,
    }, {
      id: 'related_links_rsd',
      parentID: 'browse_related_links',
      active: false,
      visible: true,
      index: 2,
      model: {
        type: MenuItemType.EXTERNAL,
        text: 'Research Services Division',
        href: 'https://services.anu.edu.au/business-units/research-services-division'
      } as ExternalLinkMenuItemModel,
    }];
    menuList.push({
      id: 'browse_related_links',
      active: false,
      visible: true,
      index: 2,
      model: {
        type: MenuItemType.TEXT,
        text: 'Related Links',
      } as ExternalLinkMenuItemModel,
    });

    menuList.forEach((menuSection) => this.menuService.addSection(MenuID.PUBLIC, Object.assign(menuSection, {
      shouldPersistOnRouteChange: true
    })));
  }
}
